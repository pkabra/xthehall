app.factory('InstantMessageService', function($window) {

  /*** Set up sinchClient ***/
  var sinchClient = new SinchClient({
      applicationKey: 'cabb81ca-a248-412a-93b4-e5d9ba3d1548',
      capabilities: {messaging: true},
      startActiveConnection: true, /* NOTE: This is required if application is to receive calls / instant messages. */ 
      //Note: For additional loging, please uncomment the three rows below
      // TODO(dilu): Remove debug logging when code is well-tested.
      onLogMessage: function(message) {
          console.log(message);
      },
  });

  // Sinch message client
  var messageClient = sinchClient.getMessageClient();

  // Sinch application key and secret
  var appKey = 'cabb81ca-a248-412a-93b4-e5d9ba3d1548';
  var appSecret = 'BtQohS+9zEKXCH9aN/GVtQ==';

  // private function: generate authentication ticket
  var generateTicket = function(id) {
    var userTicket = {
        'applicationKey': appKey,
        'identity': {'type': 'username', 'endpoint': id},
        'created': (new Date()).toISOString(),
        'expiresIn': 14400, //4 hour default expire
    }

    var userTicketJson = JSON.stringify(userTicket).replace(" ", "")
    var userTicketBase64 = $window.btoa(userTicketJson)

    // TicketSignature = Base64 ( HMAC-SHA256 ( ApplicationSecret, UTF8 ( UserTicketJson ) ) )
    var digest = CryptoJS.HmacSHA256(userTicketJson, CryptoJS.enc.Base64.parse(appSecret));
    var signature = CryptoJS.enc.Base64.stringify(digest);

    // UserTicket = TicketData + ":" + TicketSignature
    var signedUserTicket = userTicketBase64 + ':' + signature
    return {'userTicket': signedUserTicket};
  };

  /*** Handle errors, report them and re-enable UI ***/
  var handleError = function(error) {
      console.log(error.message);
  };

  return {
    // login to sinch with facebook id
    // para:
    //       id: user facebook ID
    loginSinch : function(id) {
      var ticket = generateTicket(id);
      sinchClient.start(ticket);
    },

    // send message
    // para:
    //       recipients: list of user names
    //       text: message text
    sendMessage : function(recipients, text) {
      //Create new sinch-message, using messageClient
      var sinchMessage = messageClient.newMessage(recipients, text);
      //Send the sinchMessage
      messageClient.send(sinchMessage).fail(handleError);
    },

    // add incoming message listener
    // para:
    //       listener: incoming mesasge callback handler 
    addIncomingMessageListener : function(listener) {
      var eventListener = { onIncomingMessage : listener };
      messageClient.addEventListener(eventListener);
    },

    // add delivered message listener
    // para:
    //       listener: delivered message callback handler
    addDeliveredMessageListener : function(listener) {
      var eventListener = { onMessageDelivered : listener };
      messageClient.addEventListener(eventListener); 
    }
  };
});