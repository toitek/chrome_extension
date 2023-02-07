import datetime
from flask_login import UserMixin
import sqlalchemy
from extensionApp import db


class User(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  email = db.Column(db.String(100), unique=True, nullable=False)
  given_name = db.Column(db.String(100), nullable=False)
  family_name = db.Column(db.String(100), nullable=False)
  image_url = db.Column(db.String(200), nullable=False)
  email_verified = db.Column(db.Boolean, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)
      

  def __init__(self, id, email, given_name, family_name, image_url, email_verified):
    self.id = id
    self.email = email
    self.given_name = given_name
    self.family_name = family_name
    self.image_url = image_url
    self.email_verified = email_verified

  def __repr__(self):
    return '<User {}>'.format(self.email, self.given_name, self.family_name, self.image_url, self.email_verified)

# check this model...

class Subscription(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  stripe_token = db.Column(db.String(120), nullable=False)
  last_four = db.Column(db.String(4), nullable=False)
  stripe_customer_id = db.Column(db.String(120), nullable=False)
  user_id = db.Column(db.Integer, sqlalchemy.ForeignKey('user.id'))
  user = db.relationship('User', backref=db.backref('subscriptions', lazy=True))
  given_name = db.Column(db.String(100), sqlalchemy.ForeignKey('user.given_name'))
  stripe_token = db.Column(db.String(255), nullable=False)
  subscribed_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)
  # stripe_customer_id = db.Column(db.String(255), nullable=True)







  # @declared_attr
  # def stripe_token(self):
  #     return sqlalchemy.Column(sqlalchemy.String(255), nullable=False)

  # @declared_attr
  # def last_four(self):
  #     return sqlalchemy.Column(sqlalchemy.String(4), nullable=False)

  # @declared_attr
  # def stripe_customer_id(self):
  #     return sqlalchemy.Column(sqlalchemy.String(255), nullable=True)



# class User(db.Model, UserMixin):
#     __tablename__ = "users"

#     def __init__(self, password=None, *args, **kwargs):
#         """
#         On user initialization, we assume that the passwords are being passed
#         in as plain-text from the registration form so we immediatley encrypt
#         them before they hit the database.
#         """
#         if password:
#             password = generate_password_hash(password)
#         super().__init__(password=password, *args, **kwargs)

#     @declared_attr
#     def name(self):
#         return sqlalchemy.Column(sqlalchemy.String(64), nullable=False)

#     @declared_attr
#     def email(self):
#         return sqlalchemy.Column(sqlalchemy.String(64), nullable=False)

#     @declared_attr
#     def password(self):
#         return sqlalchemy.Column(sqlalchemy.String(255), nullable=True)

#     @declared_attr
#     def stripe_token(self):
#         return sqlalchemy.Column(sqlalchemy.String(255), nullable=False)

#     @declared_attr
#     def last_four(self):
#         return sqlalchemy.Column(sqlalchemy.String(4), nullable=False)

#     @declared_attr
#     def stripe_customer_id(self):
#         return sqlalchemy.Column(sqlalchemy.String(255), nullable=True)

#     def check_password(self, password):
#         """
#         Check if a given plain text password matches the encrypted password that
#         is currently stored in the database for this Team Member.

#         :param password {str}: The password that we will check.
#         :return {bool}: Returns True if the password matches.
#         """
#         if not self.password:
#             return False
#         return check_password_hash(self.password, password)
