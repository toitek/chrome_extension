from flask import jsonify, request
import stripe
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, validators
from werkzeug.security import generate_password_hash
from extensionApp import models, utils
from Server_side.run import db
from extensionApp.models import *

""" This form will be used to register """

user_data = request.get_json()


class Register():

    email = user_data["email"]

    # stripeToken = PasswordField("Stripe Token", validators=[
    #                             validators.DataRequired()])
    # lastFour = PasswordField("Last Four", validators=[
    #                          validators.DataRequired()])

    def validate(self):
        """
        Adds additional validation to the form.

        :return {bool}: Returns True if successful.
        """
        rv = super().validate()
        if not rv:
            return False

        existing_user = User.query.filter_by(email=user_data["email"]).first()
        if existing_user is not None:
            self.email.errors.append(
                "The email address is already registered.")
            return False

        return True

    # def register_to_stripe(self, user):
    #     """
    #     Registers a user to stripe.

    #     :param user {models.User}: The user to register to stripe.
    #     :return {tuple}: Returns the customer and the subscription created.
    #     """
    #     env = utils.environment()
    #     stripe.api_key = env["billing"]["stripe"]["token"]

    #     customer = stripe.Customer.create(
    #         description=user_data["givenName"],
    #         source=self.stripeToken.data,
    #         metadata={"customer_code": user.id},
    #     )

    #     subscription = stripe.Subscription.create(
    #         customer=customer.id, items=[
    #             {"plan": env["billing"]["stripe"]["product"]}]
    #     )

    #     return customer, subscription

    def create_user(self):
        """
        Creates a new user from the form data.

        :return {models.User}: Returns the user record created.
        """
        # user = models.User(
        #     name=self.name.data,
        #     email=self.email.data,
        #     password=self.password.data,
        #     stripe_token=self.stripeToken.data,
        #     last_four=self.lastFour.data,
        # )
        user = User(
            # id=user_data['id'],
            email=user_data["email"],
            given_name=user_data["givenName"],
            family_name=user_data["familyName"],
            image_url=user_data["imageUrl"],
            email_verified=user_data["Email_verified"],
            stripe_token=self.stripeToken.data,
            last_four=self.lastFour.data,
        )

        stripe_data = self.register_to_stripe(user)
        user.stripe_customer_id = stripe_data[0].id

        db.session.add(user)
        db.session.commit()

        return user


#     print({"error": "User with this email already exists"})
#     return jsonify({"error": "User with this email already exists"})


#   db.session.add(user)
#   db.session.commit()
#   print("User data added succesfully!")
#   return jsonify({"message": "User data saved successfully"})
