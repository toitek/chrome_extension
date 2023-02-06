import os
# from user import app
from flask_sqlalchemy import SQLAlchemy
# from user import db
from user import *
import datetime
import logging
import sys
from logging import Formatter

import sqlalchemy
from flask import Flask
from flask_login import LoginManager
# from flask_migrate import Migrate
from flask_sqlalchemy import Model, SQLAlchemy
from sqlalchemy.ext.declarative import declared_attr

from extensionApp import utils

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/web_extension'

def start(override=None):
    """
    :return {Flask}: Returns the configuration Flask applciation object.
    """
    env = utils.environment()

    app = Flask(
        __name__, template_folder="/mystripeapp/mystripeapp/ui", static_folder="/mystripeapp/mystripeapp/ui/static",
    )

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/web_extension'
    
    # configuration = dict(
    #     {
    #         "SERVER_NAME": "{name}:{port}".format(name=env["app"]["name"], port=env["app"]["port"]),
    #         "WTF_CSRF_SECRET_KEY": env["app"]["secret"],
    #         "WTF_CSRF_ENABLED": True,
    #         "WTF_CSRF_METHODS": ["GET", "POST", "PUT", "DELETE"],
    #         "SQLALCHEMY_TRACK_MODIFICATIONS": False,
    #         "SQLALCHEMY_DATABASE_URI": "{provider}://{user}:{password}@{host}:{port}/{db}".format(
    #             provider=env["database"]["provider"],
    #             user=env["database"]["username"],
    #             password=env["database"]["password"],
    #             host=env["database"]["host"],
    #             port=env["database"]["port"],
    #             db=env["database"]["database"],
    #         ),
    #     },
    #     **override or {}
    # )

    # # Apply default configuration values...
    # for configuration_value in configuration:
    #     app.config[configuration_value] = configuration[configuration_value]

    # Enable the login manager library...
    app.login_manager = LoginManager(app)
    app.secret_key = env["app"]["secret"]

    # Setup the logging handlers and formatters...
    handler = logging.StreamHandler(stream=sys.stdout)
    handler.setFormatter(Formatter("%(asctime)s %(levelname)s: %(message)s"))
    handler.setLevel(logging.INFO)
    app.logger.handlers = [handler]
    app.logger.setLevel(logging.INFO)

    return app


class BaseModel(Model):
    """
    The base model for all database models. This will include some common
    columns for all tables:
    """

    @declared_attr
    def id(self):
        return sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True, nullable=False)

    @declared_attr
    def created_at(self):
        return sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.datetime.utcnow, nullable=False)


app = start()
db = SQLAlchemy(app, model_class=BaseModel)

# migrate = Migrate(app, db)

# NB: this code is only for activating self signed certificate at localhost
#       so that you may use https://localhost:<port>/
#       and its only for development and testing purposes
#       it includes the ssl_context inside app.run()
# STARTS HERE
with open('cert.pem', 'r') as f:
    cert = f.read()

with open('key.pem', 'r') as f:
    key = f.read()

os.environ['SSL_CERT'] = cert
os.environ['SSL_KEY'] = key
# ENDS HERE

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(ssl_context=('cert.pem', 'key.pem'), debug=True)