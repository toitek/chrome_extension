# from MySQLdb import IntegrityError
from datetime import datetime, timedelta
import json
import os
from flask import abort, jsonify, redirect, render_template, request, url_for, flash
from flask_login import current_user, login_required, login_user, logout_user
from jinja2 import TemplateNotFound
import stripe
from serverSide import app, db
from serverSide.models import User
from dotenv import load_dotenv, find_dotenv



# Setup Stripe python client library
load_dotenv(find_dotenv())

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
app.config['STRIPE_PUBLIC_KEY'] = os.getenv('STRIPE_PUBLIC_KEY')

@app.route("/sidebar")
@login_required
def sidebar():
    if current_user.is_authenticated:
        return render_template("sidebar.html")
    try:
        return render_template("login.html")
    except TemplateNotFound:
        abort(404)

@app.route("/login")
def login():
    if current_user.is_authenticated:
        return redirect("/dashboard")
    try:
        return render_template("login.html")
    except TemplateNotFound:
        abort(404)


@app.route("/logout", methods=["GET", "POST"])
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
    return redirect("/dashboard")


@app.route("/get_user_email", methods=["GET"])
def get_user_email():
    if current_user.is_authenticated:
        email = current_user.email
        # Return the email address as a JSON object
        return jsonify({"email": email})
    else:
        # Return an error if the user was not found
        return jsonify({"error": "User not found"}), 404


#TODO remember to check this...
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
    try:
        if current_user.is_authenticated:
            email = current_user.email
            customer = stripe.Customer.create(email=email)
            
            existing_user = User.query.filter_by(email=current_user.email).first()
            existing_user.stripe_customer_id = customer.id
            db.session.commit()
            return render_template("dashboard.html", user=current_user)
        else:
            # user is not logged in, redirect to login page
            # print("user is not logged in")
            return redirect(url_for("login"))
    except TemplateNotFound:
        abort(404)
        

@app.route('/free_trial')
@login_required
def free_trial():
    try:
        if current_user.trial_end_date:
            if datetime.now() < current_user.trial_end_date:
                # Free trial is ongoing
                flash('Your free trial is ongoing.', 'success')
                return render_template('free_trial.html', user=current_user)
            else:
                # Free trial has ended, redirect the user
                flash('Your free trial has ended. Please upgrade to a premium account to continue using the system.', 'warning')
                return redirect(url_for('dashboard'))
        else:
            # Start a new free trial
            trial_start_date = datetime.now()
            trial_end_date = trial_start_date + timedelta(days=2)
            current_user.trial_start_date = trial_start_date
            current_user.trial_end_date = trial_end_date
            db.session.commit()
            flash('Your free trial has started! You have 2 days to use the system without joining premium.', 'success')
            return render_template('free_trial.html', user=current_user)
    except TemplateNotFound:
        abort(404)

@app.route('/update_counter', methods=['POST'])
def update_counter():
    data = request.get_json()
    grammar_counter = data.get('grammarCounter', 0)
    tone_counter = data.get('toneCounter', 0)
    total_counter = grammar_counter + tone_counter
    usage_rate= total_counter * 0.5
    
    user = User.query.filter_by(email=current_user.email).first()
    if user:
        user.credits -= usage_rate
        db.session.commit()
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failure'})

@app.route('/payment_onetime')
def payment_onetime():
  session = stripe.checkout.Session.create(
    customer=current_user.stripe_customer_id,
    payment_method_types=['card'],
    line_items=[{
        'price': 'price_1MZD7lInUkX6rmARor9VZWr5',
            'quantity': 1,
        }],
    mode='payment',
    success_url=url_for('success_onetime', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
    cancel_url=url_for('dashboard', _external=True),
  )
  return {
    'checkout_session_id': session['id'],
    'checkout_public_key': app.config['STRIPE_PUBLIC_KEY']
  }


@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        prices = stripe.Price.list(
            lookup_keys=[request.form['lookup_key']],
            expand=['data.product']
        )

        checkout_session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            line_items=[
                {
                    'price': prices.data[0].id,
                    'quantity': 1,
                },
            ],
            mode='subscription',
            success_url=url_for('success_recurrent', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
    cancel_url=url_for('dashboard', _external=True),
        )
        return redirect(checkout_session.url, code=303)
    except Exception as e:
        print(e)
        return "Server error", 500

@app.route('/create-portal-session', methods=['POST'])
def customer_portal():
    # For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    # Typically this is stored alongside the authenticated user in your database.
    checkout_session_id = request.form.get('session_id', None)
    if checkout_session_id is None:
        checkout_session_id = request.args.get('session_id', None)
    if checkout_session_id is None:
        return "Session ID not found", 400
    try:
        checkout_session = stripe.checkout.Session.retrieve(checkout_session_id)
    except Exception as e:
        print(e)
        return "Error while retrieving the checkout session", 500



    # This is the URL to which the customer will be redirected after they are
    # done managing their billing with the portal.
    return_url = 'https://localhost:5000/dashboard'

    portalSession = stripe.billing_portal.Session.create(
        customer=checkout_session.customer,
        return_url=return_url,
    )
    return redirect(portalSession.url, code=303)

@app.route('/webhook', methods=['POST'])
def webhook_received():
    # Replace this endpoint secret with your endpoint's unique secret
    # If you are testing with the CLI, find the secret by running 'stripe listen'
    # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    # at https://dashboard.stripe.com/webhooks
    webhook_secret = 'whsec_12345'
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    print('event ' + event_type)

    if event_type == 'checkout.session.completed':
        print('🔔 Payment succeeded!')
    elif event_type == 'customer.subscription.trial_will_end':
        print('Subscription trial will end')
    elif event_type == 'customer.subscription.created':
        print('Subscription created %s', event.id)
    elif event_type == 'customer.subscription.updated':
        print('Subscription created %s', event.id)
    elif event_type == 'customer.subscription.deleted':
        # handle subscription canceled automatically based
        # upon your subscription settings. Or if the user cancels it.
        print('Subscription canceled: %s', event.id)

    return jsonify({'status': 'success'})


@app.route('/success_onetime')
def success_onetime():
    session_id = request.args.get('session_id', None)
    if session_id is None:
        return "Session ID not found", 400

    # Retrieve the checkout session using the session_id
    checkout_session = stripe.checkout.Session.retrieve(session_id)
    customer_id = checkout_session['customer']
    
    # Get the user associated with the customer
    user = User.query.filter_by(stripe_customer_id=customer_id).first()

    # Update the user's details in the database
    user.stripe_customer_id = customer_id
    user.account_status = "credits"
    user.credits += 1000
    db.session.commit()
    return render_template('success_onetime.html', session_id=session_id)

@app.route('/success_recurrent')
def success_recurrent():
    session_id = request.args.get('session_id')
    checkout_session = stripe.checkout.Session.retrieve(session_id)

    # Retrieve customer ID from the checkout session
    customer_id = checkout_session.customer

    # Get the user associated with the customer
    user = User.query.filter_by(stripe_customer_id=customer_id).first()

    # Update the user's details in the database
    user.stripe_customer_id = customer_id
    user.account_status = "monthly"

    # Get the start and end time of the subscription
    subscription = stripe.Subscription.retrieve(checkout_session.subscription)
    start_time = subscription.current_period_start
    end_time = subscription.current_period_end

    # Update the subscription start and end dates in the database
    user.monthly_subscription_start_date = datetime.datetime.fromtimestamp(start_time)
    user.monthly_subscription_end_date = datetime.datetime.fromtimestamp(end_time)

    # Commit the changes to the database
    db.session.commit()
    return render_template('success_recurrent.html', session_id=session_id)

# @app.route('/stripe_webhook', methods=['POST'])
# def stripe_webhook():
#     print('WEBHOOK CALLED')

#     if request.content_length > 1024 * 1024:
#         print('REQUEST TOO BIG')
#         abort(400)
#     payload = request.get_data()
#     sig_header = request.environ.get('HTTP_STRIPE_SIGNATURE')
#     endpoint_secret = 'YOUR_ENDPOINT_SECRET'
#     event = None

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, endpoint_secret
#         )
#     except ValueError as e:
#         # Invalid payload
#         print('INVALID PAYLOAD')
#         return {}, 400
#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         print('INVALID SIGNATURE')
#         return {}, 400

#     # Handle the checkout.session.completed event
#     if event['type'] == 'checkout.session.completed':
#         session = event['data']['object']
#         print(session)
#         line_items = stripe.checkout.Session.list_line_items(session['id'], limit=1)
#         print(line_items['data'][0]['description'])

#     return {}

@app.errorhandler(401)
def unauthorized_error(error):
    return render_template("Errors/Error_401.html"), 401