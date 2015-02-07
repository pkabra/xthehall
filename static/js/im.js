var global_username = '';

/*** Set up sinchClient ***/
sinchClient = new SinchClient({
    applicationKey: 'cabb81ca-a248-412a-93b4-e5d9ba3d1548',
    capabilities: {messaging: true},
    startActiveConnection: true, /* NOTE: This is required if application is to receive calls / instant messages. */ 
    //Note: For additional loging, please uncomment the three rows below
    onLogMessage: function(message) {
        console.log(message);
    },
});

function loginSinch(name) {
    Q($.post('/auth/getAuthTicket', {username: name}, {}, "json"))
        .then(sinchClient.start.bind(sinchClient))
        .then(function() {
            global_username = name;
            console.log(name);
            console.log("Successfully login to Sinch");
        })
        .fail(handleError);
}

/*** Send a new message ***/
var messageClient = sinchClient.getMessageClient();

$('button#sendMsg').on('click', function(event) {
    event.preventDefault();

    var recipients = $('input#recipients').val().split(' ');
    var text = $('input#message').val();

    //Create new sinch-message, using messageClient
    var sinchMessage = messageClient.newMessage(recipients, text);
    //Send the sinchMessage
    messageClient.send(sinchMessage).fail(handleError);
});


/*** Handle incoming messages ***/
var eventListener = {
    onIncomingMessage: function(message) {
        $('div#chatArea').append('<div class="msgRow" id="'+message.messageId+'"></div><div class="clearfix"></div>');

        $('div.msgRow#'+message.messageId)
            .append([
                '<div id="from">from: '+message.senderId+'</div>', 
                '<div id="textBody">'+message.textBody+'</div>',
                '<div class="recipients">delivered: </div>'
            ]);
    }
}

messageClient.addEventListener(eventListener);


/*** Handle delivery receipts ***/ 
var eventListenerDelivery = {
    onMessageDelivered: function(messageDeliveryInfo) {
        console.log('message sent');
        $('div#'+messageDeliveryInfo.messageId+' div.recipients').append(messageDeliveryInfo.recipientId + ' ');
    }
}

messageClient.addEventListener(eventListenerDelivery);


/*** Handle errors, report them and re-enable UI ***/
var handleError = function(error) {
    console.log(error.message);
}

