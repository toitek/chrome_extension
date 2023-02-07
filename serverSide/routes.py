# from MySQLdb import IntegrityError
from flask import abort, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user, user_logged_in
from jinja2 import TemplateNotFound
from serverSide import app, db
from serverSide.models import User


@app.route("/login")
def login():
    if current_user.is_authenticated:
        return redirect("/dashboard")
    try:
        return render_template("login.html")
    except TemplateNotFound:
        abort(404)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/login")


@app.route("/adduser", methods=["POST"])
def save_user_data():
    user_data = request.get_json()
    email = user_data["email"]

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        print("Existing user signed in succesfully!")
        login_user(existing_user)
        # return redirect("/dashboard")
        return render_template("dashboard.html", existing_user=current_user)

    user = User(
        email=user_data["email"],
        first_name=user_data["givenName"],
        last_name=user_data["familyName"],
        image_url=user_data["imageUrl"]
    )
    db.session.add(user)
    db.session.commit()
    print("New user data added succesfully!")
    login_user(user)
    # return redirect("/dashboard")
    

    # remember to check this...


@app.route("/check-email", methods=["GET"])
def check_email():
    email = request.args.get("email")
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"emailPresent": True})
    else:
        return jsonify({"emailPresent": False})


@app.route("/dashboard")
@login_required
def dashboard():
    if current_user.is_authenticated:
        # user is logged in, display payment dashboard
        # print("user is logged in")
        return render_template("dashboard.html", user=current_user)
    else:
        # user is not logged in, redirect to login page
        # print("user is not logged in")
        return redirect(url_for("login"))
