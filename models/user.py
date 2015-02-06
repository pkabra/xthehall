from core import db
from mixins import ModelMixin
from album import Album, AlbumAccess, Photo


class User(db.Model, ModelMixin):
    username = db.Column(db.String(20), primary_key=True)
    email = db.Column(db.String(40), unique=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    password = db.Column(db.String(20))  # FIXME encrypt this

    def get_all_albums(self):
        return Album.query.filter_by(username=self.username).all()

    def get_viewable_albums_by_user(self):
        albums_by_user = {}
        accesses = AlbumAccess.query.filter_by(username=self.username).all()
        others = []
        for access in accesses:
            album = Album.query.get(access.albumid)
            others.append(album)
        own = Album.query.filter_by(username=self.username, access=Album.PRIVATE).all()
        public = Album.query.filter_by(access=Album.PUBLIC).all()
        albums = others + own + public
        for album in albums:
            username = album.username
            if username not in albums_by_user:
                albums_by_user[username] = []
            albums_by_user[username].append(album)            
        return albums_by_user

    def check_password(self, password):
        return self.password == password

    def has_album_permission(self, id):
        album = Album.query.get(id)
        if album.username == self.username:
            return True

        access = AlbumAccess.query.filter_by(username=self.username, albumid=id).first()
        if not access:
            return False
        return True

    def has_pic_permission(self, id):
        photo = Photo.query.get(id)
        return self.has_album_permission(photo.get_album().albumid)
