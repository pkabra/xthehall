from core import app
from models import User
from flask import render_template, request, redirect, url_for, session
import datetime


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    if request.method == 'POST':
        username = request.form['username']
        user = User.query.filter_by(username=username).first()

        if not user:
            return render_template('login.html', msg='Your username or password is invalid')

        if not user.check_password(request.form['password']):
            return render_template('login.html', msg='Your username or password is invalid')

        session['username'] = user.username
        session['last_activity'] = datetime.datetime.utcnow()

        if 'next_page' in request.args:
            return redirect(request.args['next_page'])
        else:
            return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))
