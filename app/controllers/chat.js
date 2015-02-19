angular.module('XtheHall')
  .controller('ChatController', function($scope, AuthService, InstantMessageService, ProfileService, HistoryService) {
    $scope.title = "Chat";

    $scope.messages = [
      { incoming: true, user: "John Smith", text: "Did you check out this chat feature?" },
      { incoming: true, user: "John Smith", text: "It seems pretty cool. I love the design." },
      { incoming: false, text: "Yea, I know. I can't wait to start using this all the time!" }
    ];

    // Please DO NOT delete. This section contains example how to use 
    // InstantMessageService, ProfileService, HistoryService
    // var incomingmessageListener = function(message) {
    //   $('div#chatArea').append('<div class="msgRow" id="'+message.messageId+'"></div><div class="clearfix"></div>');

    //   $('div.msgRow#'+message.messageId)
    //       .append([
    //           '<div id="from">from: '+message.senderId+'</div>', 
    //           '<div id="textBody">'+message.textBody+'</div>',
    //           '<div class="recipients">delivered: </div>'
    //       ]);
    //   if ($scope.user.id != message.senderId)
    //     HistoryService.save($scope.user.id, message.senderId, message.textBody);
    // };

    // var deliveredMessageListener = function() {
    //   console.log('message sent');
    // };

    // InstantMessageService.addIncomingMessageListener(incomingmessageListener);

    // InstantMessageService.addDeliveredMessageListener(deliveredMessageListener);

    // $scope.sendMessage = function() {
    //   event.preventDefault();
    //   var recipients = $('input#recipients').val().split(' ');
    //   var text = $('input#message').val();

    //   InstantMessageService.sendMessage(recipients, text);

    //   console.log(recipients);

    //   for (var i = 0; i < recipients.length; i++) {
    //     HistoryService.save(recipients[i], $scope.user.id, text);
    //   }
    // };

    // $scope.onlogin = function() {
    //   AuthService.watchStatusChange();
    // }

    // $scope.getHistory = function() {
    //   HistoryService.retrieve('12345', $scope.user.id, 10).then(
    //     function(history) {
    //       console.log(history);
    //     })
    // }
  });