app.factory('HistoryService', function() {

  var History = Parse.Object.extend({
    className: 'History',
    attrs: ['receiver_id', 'sender_id', 'message']
  });

  return {
    // Save chat history
    save : function(receiver, sender, m) {
      var history = new Parse.Object('History');
      history.setReceiver_id(receiver);
      history.setSender_id(sender);
      history.setMessage(m);
      history.save(null);
    },

    // Retrieves the chat history and return a promise.
    retrieve : function(receiver, sender, num) {
      var deferred = new $.Deferred();

      query = new Parse.Query('History');
      query.equalTo('receiver_id', receiver);
      query.equalTo('sender_id', sender);
      query.descending('createdAt');
      query.limit(num);
      query.find().then(
        function(results) {
          var history = [];
          for (var i = 0; i < results.length; i++) {
            history.push({'time' : results[i].createdAt, 'message' : results[i].get('message')});
          }
          deferred.resolve(history);
        });

      return deferred.promise();
    }
  };

});