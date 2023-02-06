import stripe
from flask import Flask, abort, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user
from jinja2 import TemplateNotFound

from Server_side.run import app
# from extensionApp.ui.forms.login_form import LoginForm
from extensionApp.ui.forms.register_form import *
from extensionApp.ui.forms.subscription_form import *
from extensionApp.models import *

app = Flask(__name__)

# @app.route("/login")
# def login():
#     return render_template("login.html")


# @app.route("/add-user", methods=["POST"])
# def save_user_data():
#     user_data = request.get_json()
#     email = user_data["email"]

#   existing_user = User.query.filter_by(email=email).first()
#   if existing_user:
#     print({"error": "User with this email already exists"})
#     return jsonify({"error": "User with this email already exists"})

#   user = User(
#     id=user_data['id'],
#     email=user_data["email"],
#     given_name=user_data["givenName"],
#     family_name=user_data["familyName"],
#     image_url=user_data["imageUrl"],
#     email_verified=user_data["Email_verified"]
#   )
#   db.session.add(user)
#   db.session.commit()
#   print("User data added succesfully!")
#   return jsonify({"message": "User data saved successfully"})


@app.route("/check-email", methods=["GET"])
def check_email():
    email = request.args.get("email")
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"emailPresent": True})
    else:
        return jsonify({"emailPresent": False})


################################################


# @app.route("/login", methods=["GET", "POST"])
# def login():
#     if current_user.is_authenticated:
#         return redirect("/dashboard")

#     form = LoginForm()
#     if form.validate_on_submit():
#         login_user(form.user)
#         return redirect("/dashboard")

#     try:
#         return render_template("views/auth/register.html", form=form)
#     except TemplateNotFound:
#         abort(404)


@app.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect("/dashboard")

    user_data = Register()
    if user_data.validate_on_submit():
        try:
            user = user_data.create_user()
            login_user(user)
            return redirect("/dashboard")
        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get("error", {})
            user_data.stripeToken.errors.append(
                "We could not process your information. {}".format(err.get("message")))
        except stripe.error.RateLimitError as e:
            user_data.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.InvalidRequestError as e:
            user_data.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.AuthenticationError as e:
            user_data.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.APIConnectionError as e:
            user_data.stripeToken.errors.append(
                "We cannot currently access out payment provider. Try again soon or reach out to the support team."
            )
        except stripe.error.StripeError as e:
            user_data.stripeToken.errors.append(
                "There was a problem with the payment information.")

    try:
        return render_template("views/auth/register.html", user_data=user_data)
    except TemplateNotFound:
        abort(404)


@app.route("/subscription")
def subscription():
    form = Subscription()    
    try:
        user = form.user_subscription()
        login_user(user)
        return redirect("/dashboard")
    except stripe.error.CardError as e:
        body = e.json_body
        err = body.get("error", {})
        form.stripeToken.errors.append(
        "We could not process your information. {}".format(err.get("message")))
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
        form.stripeToken.errors.append(
                "There was a problem with the payment information.")
    except TemplateNotFound:
        abort(404)
    return render_template("views/auth/subscription.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/register")
