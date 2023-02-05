from MySQLdb import IntegrityError
from flask import Flask, jsonify, redirect, render_template, request, url_for
from google.oauth2.credentials import Credentials
from flask_sqlalchemy import SQLAlchemy
# from Web import db
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/web_extension'
db = SQLAlchemy(app)



class User(db.Model):
  id = db.Column(db.Numeric(38, 0), primary_key=True)
  email = db.Column(db.String(100), unique=True, nullable=False)
#   access_token = db.Column(db.Text, nullable=False)
  given_name = db.Column(db.String(100), nullable=False)
  family_name = db.Column(db.String(100), nullable=False)
  image_url = db.Column(db.String(200), nullable=False)
  email_verified = db.Column(db.Boolean, nullable=False)


  def __init__(self, id, email, given_name, family_name, image_url, email_verified):
    self.id = id
    self.email = email
    self.given_name = given_name
    self.family_name = family_name
    self.image_url = image_url
    self.email_verified = email_verified

  def __repr__(self):
    return '<User {}>'.format(self.email, self.given_name, self.family_name, self.image_url, self.email_verified)


@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/api/user", methods=["POST"])
def save_user_data():
  user_data = request.get_json()
  email = user_data["email"]
  
  existing_user = User.query.filter_by(email=email).first()
  if existing_user:
    print({"error": "User with this email already exists"})
    return jsonify({"error": "User with this email already exists"})
    
  user = User(
    id=user_data['id'],
    email=user_data["email"],
    given_name=user_data["givenName"],
    family_name=user_data["familyName"],
    image_url=user_data["imageUrl"],
    email_verified=user_data["Email_verified"]
  )
  db.session.add(user)
  db.session.commit()
  print("User data added succesfully!")
  return jsonify({"message": "User data saved successfully"})

@app.route("/check-email", methods=["GET"])
def check_email():
  email = request.args.get("email")
  user = User.query.filter_by(email=email).first()
  if user:
    return jsonify({"emailPresent": True})
  else:
    return jsonify({"emailPresent": False})
