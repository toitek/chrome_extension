import os
from flask_login import LoginManager
from serverSide import *
from flask_sqlalchemy import SQLAlchemy
from serverSide.routes import *

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

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