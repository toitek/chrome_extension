from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

# name = "extensionApp"



# env = utils.environment()

app = Flask(__name__)

# Enable the login manager library...
app.login_manager = LoginManager(app)
# app.secret_key = env["app"]["secret"]


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/web_extension'
db = SQLAlchemy(app)
