import datetime
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from serverSide import db



class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_url = db.Column(db.String(200), nullable=False, default='default.jpg')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    stripe_customer_id = db.Column(db.String(100))
    account_status = db.Column(db.String(100), default="free")
    trial_start_date = db.Column(db.DateTime)
    trial_end_date = db.Column(db.DateTime)
    monthly_subscription_start_date = db.Column(db.DateTime)
    monthly_subscription_end_date = db.Column(db.DateTime)
    credits = db.Column(db.Integer, default=0)

    def __init__(self, first_name, last_name, email, image_url):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.image_url = image_url

    def __repr__(self):
        return '<User {}>'.format(self.email, self.first_name, self.last_name, self.image_url)
    
    def is_active(self):
        return True