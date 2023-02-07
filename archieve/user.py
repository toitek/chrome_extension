# # from MySQLdb import IntegrityError
# from flask import Flask, jsonify, redirect, render_template, request, url_for
# from google.oauth2.credentials import Credentials
# from flask_sqlalchemy import SQLAlchemy
# # from Web import db
# from flask_sqlalchemy import SQLAlchemy
# from extensionApp.models import *

# app = Flask(__name__)

# # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/web_extension'
# db = SQLAlchemy(app)


# @app.route("/login")
# def login():
#     return render_template("login.html")

# @app.route("/api/user", methods=["POST"])
# def save_user_data():
#   user_data = request.get_json()
#   email = user_data["email"]
  
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

# @app.route("/check-email", methods=["GET"])
# def check_email():
#   email = request.args.get("email")
#   user = User.query.filter_by(email=email).first()
#   if user:
#     return jsonify({"emailPresent": True})
#   else:
#     return jsonify({"emailPresent": False})
