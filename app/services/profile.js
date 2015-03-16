app.factory('ProfileService', function($q) {
  // Profile Data
  var Profile = Parse.Object.extend({
    className: 'Profile',
    attrs: ['fbid', 'image', 'interest', 'avatar', 'nickname', 'hospital_info', 'location']
  });

  // singleton
  var profile = null;

  return {
    // Initialize user profile with id. Create a new profile when the profile
    // asscociated with id does not exist.
    // para:
    //       id: user facebook id
    // TODO(dilu): Remove debug logging when code is well-tested.
    init : function(id) {
      var deferred = $q.defer();
      var query = new Parse.Query('Profile');
      query.equalTo('fbid', id.toString());
      query.find().then(
        function(result) {
          console.log("Finding user...");
          if (result.length == 0) {
            profile = new Parse.Object('Profile');
            profile.setFbid(id.toString());
          } else {
            profile = result[0];
          }
          // update the profile
          console.log("Initializing GeoPoint service..");
          Parse.GeoPoint.current({
            success: function (point) {
                console.log("GeoPoint successful...")
                profile.set('location', point);
                profile.save(null).then(
                  function(profile) {
                    console.log('Successfully update a new profile');
                  },
                  function(profile, error) {
                    console.log('Failed to update profile with error ' + error);
                  });
                deferred.resolve();
            }
          });
        },
        function(error) {
          console.log('Failed to retrieve profile with id' + id.toString());
          deferred.resolve();
        });
      return deferred.promise;
    },

    getId : function() {
      return profile.getFbid();
    },

    // return a URL to the image due to cross domain secucity issue
    getImage : function() {
      return profile.getImage().url();
    },

    getInterest : function() {
      return profile.getInterest();
    },

    getAvatar : function() {
      return profile.getAvatar();
    },

    getNickname : function() {
      return profile.getNickname();
    },

    getHospital_info : function() {
      return profile.getHospital_info();
    },

    getLocation: function() {
      return profile.getLocation();
    },

    setImage : function(files) {
      var deferred = $q.defer();
      if (files.length > 0) {
        var file = files[0];
        var parseFile = new Parse.File(file.name, file);
        parseFile.save().then(function() {
          profile.setImage(parseFile);
          profile.save().then(function() {
            deferred.resolve();
          });
        }, function(error) {
          console.log('Failed to save image to Parse ' + error);
        });
      } else {
        console.log('image file is empty');
      }

      return deferred.promise;
    },

    setInterest : function(interestList) {
      if (!Array.isArray(interestList)) {
        console.log('setInterest takes array argument');
        return;
      }
      profile.setInterest(interestList);
      profile.save();
    },

    addInterest : function(interest) {
      if (profile.getInterest() == null) {
        var interestList = [];
        profile.setInterest(interestList);
      }
      profile.addUnique('interest', interest);
      profile.save();
    },

    removeInterest : function(interest) {
      if (profile.getInterest() == null) {
        return;
      }
      profile.remove('interest', interest);
      profile.save();
    },

    setAvatar : function(avatar) {
      profile.setAvatar(avatar);
      profile.save();
    },

    setNickname : function(nickname) {
      profile.setNickname(nickname);
      profile.save();
    },

    setHospital_info : function(hospital_info) {
      profile.setHospital_info(hospital_info);
      profile.save();
    },

    // Find a single user
    getUserWithId: function(user_id) {
      var deferred = $q.defer();
      var query = new Parse.Query('Profile');
      query.equalTo('objectId', user_id);
      query.find().then(function(user) {
        deferred.resolve(user);
      });
      return deferred.promise;
    },

    // Find an array of users
    getUsersWithIds: function (user_ids) {
      var deferred = $q.defer();
      var query = new Parse.Query('Profile');
      query.containedIn('objectId', user_ids);
      query.find().then(function (users) {
        deferred.resolve(users);
      });
      return deferred.promise;
    }
  };
});