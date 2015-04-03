app.factory('MatchService', function($q, ProfileService) {

  return {
    // return a promise containning a list of users limited by the num
    // and sorted by the distance
    // param:
    //     num: limit of number of return users
    findUsersByLocation : function(num) {
      var deferred = $q.defer();
      var myGeoPoint = ProfileService.getLocation();

      var query = new Parse.Query('Profile');
      query.near("location", myGeoPoint);
      query.limit(num);
      query.find({
        success: function(users) {
          deferred.resolve(users);
        },
        error: function(error) {
          console.log("Error: " + error.code + " " + error.message);
          deferred.resolve();
        }
      });
      return deferred.promise;
    },

    // return a promise containning a list of users limited by the num randomly
    // param:
    //     num: limit of number of return users
    findUsersRandom : function(num) {
      // promise
      var deferred = $q.defer();
      var query = new Parse.Query('Profile');
      query.descending('updatedAt');
      query.limit(num);

      query.find({
        success: function(users) {
          deferred.resolve(users);
        },
        error: function(error) {
          console.log("Error: " + error.code + " " + error.message);
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    // return a promise containning a list of users limited by the num
    // and sorted by the number of common interests
    // param:
    //     num: limit of number of return users
    findUsersByInterest : function(num) {
      var interestList = ProfileService.getInterest();
      var ret = {};
      var count = {};
      var asyncDone = 0;

      var deferred = $q.defer();

      for (var i = 0; i < interestList.length; i++) {
        var query = new Parse.Query('Profile');
        query.equalTo('interest', interestList[i].toString());
        query.find({
          success: function(users) {
            for (var j = 0; j < users.length; j++) {
              if (typeof ret[users[j].get('fbid')] === "undefined") {
                ret[users[j].get('fbid')] = users[j];
                count[users[j].get('fbid')] = 0;
              } else {
                count[users[j].get('fbid')] = count[users[j].get('fbid')] + 1;
              }
            }
            asyncDone += 1;
            if (asyncDone == interestList.length) {
              var keysSorted = Object.keys(count).sort(function(a,b){return count[b]-count[a]});
              var temp = [];
              for (var j = 0; j < num && j < keysSorted.length; j++) {
                temp.push(ret[keysSorted[j]]);
              }
              deferred.resolve(temp);
            }
          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
            deferred.resolve();
          }
        })
      }

      return deferred.promise;
    }
  }

});