angular.module('XtheHall')
  .controller('HomeController', function($scope, InstantMessageService, ProfileService, HistoryService) {
    $scope.title = "Hello World";

    var incomingmessageListener = function(message) {
      $('div#chatArea').append('<div class="msgRow" id="'+message.messageId+'"></div><div class="clearfix"></div>');

      $('div.msgRow#'+message.messageId)
          .append([
              '<div id="from">from: '+message.senderId+'</div>', 
              '<div id="textBody">'+message.textBody+'</div>',
              '<div class="recipients">delivered: </div>'
          ]);
      if ($scope.user.id != message.senderId)
        HistoryService.save($scope.user.id, message.senderId, message.textBody);
    };

    var deliveredMessageListener = function() {
      console.log('message sent');
    };

    InstantMessageService.addIncomingMessageListener(incomingmessageListener);

    InstantMessageService.addDeliveredMessageListener(deliveredMessageListener);

    $scope.sendMessage = function() {
      event.preventDefault();
      var recipients = $('input#recipients').val().split(' ');
      var text = $('input#message').val();

      InstantMessageService.sendMessage(recipients, text);

      console.log(recipients);

      for (var i = 0; i < recipients.length; i++) {
        HistoryService.save(recipients[i], $scope.user.id, text);
      }
    };

    $scope.getHistory = function() {
      HistoryService.retrieve('12345', $scope.user.id, 10).then(
        function(history) {
          console.log(history);
        })
    }
  });