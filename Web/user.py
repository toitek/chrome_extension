from flask import Flask, redirect, render_template, request
from google.oauth2.credentials import Credentials
from flask_sqlalchemy import SQLAlchemy
# from Web import db
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# app = flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/web_extension'
db = SQLAlchemy(app)



class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(100), unique=True, nullable=False)
  access_token = db.Column(db.Text, nullable=False)
  given_name = db.Column(db.String(100), nullable=False)
  family_name = db.Column(db.String(100), nullable=False)
  image_url = db.Column(db.String(200), nullable=False)
  email_verified = db.Column(db.Boolean, nullable=False)


  def __repr__(self):
    return '<User {}>'.format(self.email, self.given_name, self.family_name, self.image_url, self.email_verified)

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/api/user", methods=["POST"])
def save_user_data():
    user_data = request.get_json()

    user = User(email=user_data["email"], access_token=user_data["access_token"],
				given_name=user_data["givenName"], family_name=user_data["familyName"],
				image_url=user_data["imageUrl"], email_verified=user_data["emailVerified"])
    db.session.add(user)
    db.session.commit()

    return "User data saved successfully!", 200



# @app.route("/login")
# def login():
#   # Redirect the user to Google Sign-In page
#   return redirect("https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:5000/callback&scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline")

# @app.route("/callback")
# def callback():
#   # Get the authorization code from the query parameters
#   code = request.args.get("code")

#   # Use the authorization code to get an access token
#   credentials = Credentials.from_authorized_user_code(
#       code,
#       ["https://www.googleapis.com/auth/userinfo.email"],
#       client_id="1081264112106-06vrkigqa5a8eh2n3u5p1ibq1fppcc5d.apps.googleusercontent.com",
#       client_secret="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",
#       redirect_uri="http://localhost:5000/callback"
#   )

#   # Store the access token, user information, given name, and family name in your database
#   user_info = credentials.id_token
#   given_name = user_info.get("given_name", "")
#   family_name = user_info.get("family_name", "")
#   user = User(email=user_info["email"], access_token=credentials.to_json(), given_name=given_name, family_name=family_name)
#   db.session.add(user)
#   db.session.commit()

#   # Redirect the user to the extension
#   return redirect("chrome-extension://iknjnipdmpepijgnkgabgbedbimahgni/options")

# create the database
# db.create_all()

# function handleCredentialResponse(response) {
# 	const responsePayload = decodeJwtResponse(response.credential);

# 	user = User(email=responsePayload.email, given_name=responsePayload.given_name, 
#                  family_name=responsePayload.family_name, access_token=response.credential)
# 	db.session.add(user)
# 	db.session.commit()
# }