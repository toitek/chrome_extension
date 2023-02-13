import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import stripe


app = Flask(__name__)

app.secret_key = "supersecret"

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/web_extension'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sam:ksam8657@localhost/web_extension'
db = SQLAlchemy(app)

app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True

# Set the stripe API key
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
