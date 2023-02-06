import stripe
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, validators
from werkzeug.security import generate_password_hash
from extensionApp import models, utils
from Server_side.run import db
from extensionApp.models import *

class Subscription():
    stripeToken = PasswordField("Stripe Token", validators=[
                                validators.DataRequired()])
    lastFour = PasswordField("Last Four", validators=[
                             validators.DataRequired()])
    
    def register_to_stripe(self, user):
        """
        Registers a user to stripe.

        :param user {models.User}: The user to register to stripe.
        :return {tuple}: Returns the customer and the subscription created.
        """
        env = utils.environment()
        stripe.api_key = env["billing"]["stripe"]["token"]

        customer = stripe.Customer.create(
            description=user.givenName,
            source=self.stripeToken.data,
            metadata={"customer_code": user.id},
        )

        subscription = stripe.Subscription.create(
            customer=customer.id, items=[
                {"plan": env["billing"]["stripe"]["product"]}]
        )

        return customer, subscription

    def user_subscription(self, user_id):
        """
         Creates a new subscription from the form data.

        :return {models.Subscription}: Returns the subscription record created by the customer.
        """
        user = User.query.get(user_id)
        if not user:
            raise Exception("User not found")
        
        customer = Subscription(
            description=user.given_name,
            source=self.stripeToken.data,
            stripe_token=self.stripeToken.data,
            last_four=self.lastFour.data,
        )

        stripe_data = self.register_to_stripe(user)
        customer.stripe_customer_id = stripe_data[0].id

        db.session.add(customer)
        db.session.commit()

        return customer 