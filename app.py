from core import app
from routes import main, auth

if __name__ == '__main__':
    app.run(debug=True) # FIXME this should be a setting
