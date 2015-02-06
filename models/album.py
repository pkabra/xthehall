from core import db
from mixins import ModelMixin
import hashlib
import time
import datetime
import logging


class Album(db.Model, ModelMixin):
    PUBLIC = 'public'
    PRIVATE = 'private'

    albumid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    created = db.Column(db.DateTime)
    lastupdated = db.Column(db.DateTime, onupdate=datetime.datetime.now)
    username = db.Column(db.String(20), db.ForeignKey('user.username'))
    access = db.Column(db.String(20), default=PUBLIC)

    def get_all_photos(self):
        contains = Contain.query.filter_by(albumid=self.albumid).order_by(Contain.sequencenum.asc()).all()
        photos = []
        for contain in contains:
            photos.append(Photo.query.get(contain.picid))

        return photos

    def get_users(self):
        from user import User
        accesses = AlbumAccess.query.filter_by(albumid=self.albumid).all()
        users = []
        for access in accesses:
            username = access.username
            user = User.query.get(username)
            users.append(user)
        return users

    def add_user(self, username):
        from user import User
        user = User.query.get(username)
        if(user):
            access = AlbumAccess(albumid=self.albumid, username=username)
            db.session.add(access)
            db.session.commit()

    def remove_user(self, username):
        access = AlbumAccess.query.filter_by(albumid=self.albumid, username=username).first()
        db.session.delete(access)
        db.session.commit()        

    def delete_photos(self):
        contains = Contain.query.filter_by(albumid=self.albumid).all()
        for contain in contains:
            photo = Photo.query.get(contain.picid)
            db.session.delete(contain)
            db.session.commit()
            db.session.delete(photo)
            db.session.commit()

    def delete_users(self):
        accesses = AlbumAccess.query.filter_by(albumid=self.albumid)
        for access in accesses:
            db.session.delete(access)
            db.session.commit()

    def delete(self):
        self.delete_photos()
        self.delete_users()
        db.session.delete(self)
        db.session.commit()

    def __init__(self, **kwargs):
        ModelMixin.__init__(self, **kwargs)
        self.created = datetime.datetime.now()


class Photo(db.Model, ModelMixin):
    picid = db.Column(db.String(40), primary_key=True)
    url = db.Column(db.String(255))
    format = db.Column(db.String(3), nullable=False)
    date = db.Column(db.DateTime)
    filename = db.Column(db.String(40))

    def __init__(self, **kwargs):
        ModelMixin.__init__(self, **kwargs)
        self.format = self.filename.split('.')[-1]
        self.picid = hashlib.md5(self.filename + str(time.time())).hexdigest()
        self.filename = self.picid + '.' + self.format
        self.url = '/static/pictures/' + self.filename
        self.date = datetime.datetime.now()

    def get_album(self):
        contains = Contain.query.filter_by(picid=self.picid).first()
        album = Album.query.get(contains.albumid)
        return album

    def get_next_and_prev(self):
        album = self.get_album()
        photos = album.get_all_photos()

        next = prev = None

        length = len(photos)
        for i in range(0, length):
            photo = photos[i]
            if photo.picid == self.picid:
                if i > 0:
                    prev = photos[i - 1]

                if i < length - 1:
                    next = photos[i + 1]

                break

        return (next, prev)


class Contain(db.Model, ModelMixin):
    __tablename__ = "contain"
    id = db.Column(db.Integer, primary_key=True)
    albumid = db.Column(db.Integer, db.ForeignKey('album.albumid'))
    picid = db.Column(db.String(40), db.ForeignKey('photo.picid'))
    caption = db.Column(db.String(255))
    sequencenum = db.Column(db.Integer)

    def __init__(self, **kwargs):
        ModelMixin.__init__(self, **kwargs)
        latest_contain = Contain.query.filter_by(albumid=self.albumid).order_by(Contain.sequencenum.desc()).first()
        if not latest_contain:
            self.sequencenum = 0
        else:
            self.sequencenum = latest_contain.sequencenum + 1


class AlbumAccess(db.Model, ModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    albumid = db.Column(db.Integer, db.ForeignKey('album.albumid'))
    username = db.Column(db.String(20), db.ForeignKey('user.username'))

    def __init__(self, **kwargs):
        ModelMixin.__init__(self, **kwargs)