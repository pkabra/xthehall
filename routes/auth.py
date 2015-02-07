from core import app
from models import User
from flask import render_template, request, redirect, url_for, session, jsonify
from datetime import datetime
import json
import uuid
import hmac
import hashlib
import base64

# App key + secret
APPLICATION_KEY = 'cabb81ca-a248-412a-93b4-e5d9ba3d1548'
APPLICATION_SECRET = 'BtQohS+9zEKXCH9aN/GVtQ=='

@app.route('/auth/getAuthTicket', methods=['POST'])
def getAuthTicket():
    userTicket = {
        'identity': {'type': 'username', 'endpoint': request.form['username']},
        'expiresIn': 3600, #1 hour expiration time of session when created using this ticket
        'applicationKey': APPLICATION_KEY,
        'created': datetime.utcnow().isoformat()
    }

    userTicketJson = json.dumps(userTicket).replace(" ", "")
    userTicketBase64 = base64.b64encode(userTicketJson)

    # TicketSignature = Base64 ( HMAC-SHA256 ( ApplicationSecret, UTF8 ( UserTicketJson ) ) )
    digest = hmac.new(base64.b64decode(
        APPLICATION_SECRET), msg=userTicketJson, digestmod=hashlib.sha256).digest()
    signature = base64.b64encode(digest)

    # UserTicket = TicketData + ":" + TicketSignature
    signedUserTicket = userTicketBase64 + ':' + signature
    return jsonify(userTicket = signedUserTicket)

