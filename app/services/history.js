app.factory('HistoryService', function($rootScope) {

  return {
    // Save chat history
    // Para:
    //       receiver: receiver ID
    //       sender: sender ID
    //       m: message
    save : function(room, sender, m) {
      var history = new Parse.Object('MessageHistory');
      history.setRoom_id(room);
      history.setSender_id(sender);
      history.setMessage(m);
      // TODO(dilu): Add save success and failure handlers.
      history.save(null);
    },

    create_room: function (users, success) {
      var room = new Parse.Object('Chatrooms');
      room.setUsers(users);
      room.save(null, {
        success: function (room) {
          success(room);
        }
      });
    },

    retrieveRoom: function (room_id, deferred) {
      var query = new Parse.Query('Chatrooms');
      query.equalTo('objectId', room_id);
      query.limit(1);

      query.find().then(function(results) {
        // chat room
        $rootScope.room = {
          id: results[0].id,
          createdAt: results[0].createdAt,
          updatedAt: results[0].updatedAt,
          users: []
        };
        
        var userQuery = new Parse.Query('Profile');
        userQuery.containedIn('fbid', results[0].attributes.users);
        userQuery.find().then(function(results) {
          $rootScope.room.users = results;
          deferred.resolve();
        });
      });
    },

    // Retrieves the chat history and return a promise.
    // Para:
    //       receiver: receiver ID
    //       sender: sender ID
    //       num: number of messages retrieved
    // Return a list of chat history containing timestamp and message text as a promise.
    retrieveHistory : function(room_id, num) {
      // promise
      var deferred = new $.Deferred();
      var query = new Parse.Query('MessageHistory');
      query.equalTo('room_id', room_id);
      query.descending('createdAt');
      query.limit(num);

      query.find().then(
        function(results) {
          // chat history
          var history = [];
          for (var i = 0; i < results.length; i++) {
            history.push({'time' : results[i].createdAt, 'message' : results[i].get('message'), 'sender': results[i].get('sender_id')});
          }
          deferred.resolve(history);
        });

      return deferred.promise();
    }
  };

});