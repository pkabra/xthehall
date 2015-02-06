import os
import datetime

from core import app, db
from wrappers import session_manager
from models import User, Album, Photo, Contain
from models.album import AlbumAccess
from flask import render_template, request, redirect, session, url_for


@app.route('/', methods=['GET'])
@session_manager()
def index():
    return render_template('index.html', title="Home")
