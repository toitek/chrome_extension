import stripe
from flask import abort, redirect, render_template, request
from flask_login import current_user, login_required, login_user, logout_user
from jinja2 import TemplateNotFound
from extensionApp import app
from extensionApp.ui.forms.subscription_form import *
from extensionApp.models import *

@app.route("/")
def welcome():
    try:
        return render_template("views/landing.html")
    except TemplateNotFound:
        abort(404)

def process_data(request):
    user_data = request.get_json()
    return user_data


@app.route("/register", methods=["GET", "POST"])
def register():
    
    userData = process_data(request)
    
    if current_user.is_authenticated:
        return redirect("/dashboard")

    userData = Register()
    if userData.validate_on_submit():
            user = userData.create_user()
            login_user(user)
            return redirect("/dashboard")
    try:
        return render_template("views/auth/register.html", userData=userData)
    except TemplateNotFound:
        abort(404)



class Register():
    
    def validate(self):
        """
        Adds additional validation to the Google Identity Service.

        :return {bool}: Returns True if successful.
        """
        rv = super().validate()
        if not rv:
            return False
        
        data = process_data(request)
        existing_user = User.query.filter_by(email=data["email"]).first()
        if existing_user is not None:
            self.email.errors.append(
                "The email address is already registered.")
            return False

        return True

    def create_user(self):
        """
        Creates a new user from the user_data retrieved from Google.

        :return {models.User}: Returns the user record created.
        """
        data = process_data(request)
        user = User(
            email=data["email"],
            given_name=data["givenName"],
            family_name=data["familyName"],
            image_url=data["imageUrl"],
            email_verified=data["Email_verified"],
        )

        db.session.add(user)
        db.session.commit()

        return user



@app.route("/subscription", methods=["GET", "POST"])
def subscription():
    form = Subscription()
    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        subscription = Subscription(user_id=user.id, given_name=user.givenName)
        subscription.stripeToken = form.stripeToken.data
        subscription.lastFour = form.lastFour.data
        try:
            customer, _ = subscription.register_to_stripe()
            subscription.stripe_customer_id = customer.id
            db.session.add(subscription)
            db.session.commit()
            return redirect("/dashboard")
        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get("error", {})
            form.stripeToken.errors.append(
                "We could not process your information. {}".format(err.get("message"))
            )
        except stripe.error.RateLimitError as e:
            form.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.InvalidRequestError as e:
            form.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.AuthenticationError as e:
            form.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.APIConnectionError as e:
            form.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.StripeError as e:
            form.stripeToken.errors.append("There was a problem with the payment information.")
        except TemplateNotFound:
            abort(404)
    return render_template("views/auth/subscription.html", form=form)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/register")



@app.route("/dashboard")
@login_required
def dashboard():
    try:
        return render_template("views/dashboard.html", user=current_user)
    except TemplateNotFound:
        abort(404)

# check this...

@app.route("/account/delete", methods=["POST"])
@login_required
def delete_account():
    # env = utils.environment()

    # stripe.api_key = env["billing"]["stripe"]["token"]
    for subscription in stripe.Subscription.list(customer=current_user.stripe_customer_id):
        if subscription.customer == current_user.stripe_customer_id:
            subscription.delete()

    db.session.delete(current_user)
    db.session.commit()

    logout_user()
    return redirect("/register")


# @app.route("/check-email", methods=["GET"])
# def check_email():
#     email = request.args.get("email")
#     user = User.query.filter_by(email=email).first()
#     if user:
#         return jsonify({"emailPresent": True})
#     else:
#         return jsonify({"emailPresent": False})
