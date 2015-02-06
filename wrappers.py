import datetime
from functools import wraps
from models import User
from flask import session, request, url_for, redirect


def session_inactive(session):
    timediff = datetime.datetime.utcnow() - session.get('last_activity')
    if timediff.seconds > (60 * 5):
        return True
    return False


def session_manager(required=False):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            request.user = None
            if 'username' in session:
                if not session_inactive(session):
                    request.user = User.query.filter_by(username=session.get('username')).first()
                    session['last_activity'] = datetime.datetime.utcnow()
                else:
                    session.clear()
            if required and not request.user:
                next_page = request.url.replace(request.url_root, request.script_root + '/')
                return redirect(url_for('login', next_page=next_page))
            return f(*args, **kwargs)
        return wrapped
    return wrapper
