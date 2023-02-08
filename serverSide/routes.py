# from MySQLdb import IntegrityError
import datetime
import os
from flask import abort, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user
from jinja2 import TemplateNotFound
import stripe
from serverSide import app, db
from serverSide.models import User
from dotenv import load_dotenv, find_dotenv


# Setup Stripe python client library
load_dotenv(find_dotenv())

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@app.route("/login")
def login():
    if current_user.is_authenticated:
        return redirect("/dashboard")
    try:
        return render_template("login.html")
    except TemplateNotFound:
        abort(404)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/login")


@app.route("/adduser", methods=["POST"])
def save_user_data():
    user_data = request.get_json()
    email = user_data["email"]

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        print("Existing user signed in succesfully!")
        login_user(existing_user)
        # return redirect("/dashboard")
        return render_template("dashboard.html", existing_user=current_user)

    user = User(
        email=user_data["email"],
        first_name=user_data["givenName"],
        last_name=user_data["familyName"],
        image_url=user_data["imageUrl"]
    )
    db.session.add(user)
    db.session.commit()
    print("New user data added succesfully!")
    login_user(user)
    # return redirect("/dashboard")
    

    # remember to check this...


@app.route("/check-email", methods=["GET"])
def check_email():
    email = request.args.get("email")
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"emailPresent": True})
    else:
        return jsonify({"emailPresent": False})


@app.route("/dashboard")
@login_required
def dashboard():
    if current_user.is_authenticated:
        # user is logged in, display payment dashboard
        # print("user is logged in")
        return render_template("dashboard.html", user=current_user)
    else:
        # user is not logged in, redirect to login page
        # print("user is not logged in")
        return redirect(url_for("login"))

@app.route('/payment', methods=['GET', 'POST'])
@login_required
def payment():
  # Check if the user is logged in
  if not current_user.is_authenticated:
    return redirect(url_for('login'))

  # Get the current user's information from the database
  user = User.query.filter_by(email=current_user.email).first()
  
  # Check if the user already has an active trial or subscription
  if user.account_status == "trial" or user.account_status == "monthly" or user.account_status == "credits":
    return redirect(url_for('dashboard'))

  if request.method == 'POST':
    # Get the user's selected plan from the form
    selected_plan = request.form.get('plan')

    # Handle the 2-day trial
    if selected_plan == 'start_trial':
      user.trial_start_date = datetime.datetime.now()
      user.trial_end_date = datetime.datetime.now() + datetime.timedelta(days=2)
      user.account_status = "trial"

    # Handle the purchase of credits
    elif selected_plan == 'credits':
      # Get the amount of credits to purchase
      credits_amount = int(request.form.get('credits_amount'))

      # Charge the user's card using the Stripe API
      try:
        charge = stripe.Charge.create(
          amount=credits_amount * 100, # Convert the amount to cents
          currency="usd",
          customer=user.stripe_customer_id,
          description="Purchase of credits"
        )
        user.account_status = "credits"
      except stripe.error.CardError as e:
        return render_template('payment.html', error=e.message)

      # Update the user's credit balance in the database
      user.credits += credits_amount

    # Handle the monthly subscription
    elif selected_plan == request.form.get('monthly'):
      # Create a recurring charge using the Stripe API
      try:
        subscription = stripe.Subscription.create(
          customer=user.stripe_customer_id,
          items=[
            {
              "plan": "monthly_plan_id",
            },
          ],
          expand=["latest_invoice.payment_intent"],
        )
      except stripe.error.CardError as e:
        return render_template('payment.html', error=e.message)

      user.account_status = "monthly"

    # Save the updated user information to the database
    db.session.commit()

  return render_template('payment.html')