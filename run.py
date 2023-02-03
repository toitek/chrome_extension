from Web.user import app
from flask_sqlalchemy import SQLAlchemy
from Web.user import db
from Web.user import *

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)