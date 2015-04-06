app.factory('ProfileService', function($q, $rootScope) {
  // Profile Data
  var Profile = Parse.Object.extend({
    className: 'Profile',
    attrs: ['fbid', 'image', 'interest', 'avatar', 'nickname', 'hospital_info', 'location', 'release_date', 'voice_control']
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
          if (result.length == 0) {
            profile = new Parse.Object('Profile');
            profile.setFbid(id.toString());
            profile.setNickname('XtheHallUser');
            profile.save(null).then(
              function(resp) {
                console.log('Successfully update location');
                deferred.resolve(profile);
              },
              function(resp, error) {
                console.log('Failed to update lcoation with error ' + error);
                deferred.resolve(profile);
              });
              window.location.href="#/profile_settings";
          } else {
            profile = result[0];
            deferred.resolve(profile);
          }
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
      var image = profile.getImage();
      if (image) {
        return image.url();
      }
      return "";
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

    getReleaseDate: function() {
      return profile.getReleaseDate();
    },

    getLocation: function() {
      return profile.getLocation();
    },

    getVoice_control: function() {
      return profile.getVoice_control();
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
    },

    addInterest : function(interest) {
      if (profile.getInterest() == null) {
        var interestList = [];
        profile.setInterest(interestList);
      }
      profile.addUnique('interest', interest);
    },

    removeInterest : function(interest) {
      if (profile.getInterest() == null) {
        return;
      }
      profile.remove('interest', interest);
    },

    setAvatar : function(avatar) {
      profile.setAvatar(avatar);
    },

    setNickname : function(nickname) {
      profile.setNickname(nickname);
    },

    setHospital_info : function(hospital_info) {
      profile.setHospital_info(hospital_info);
    },

    setReleaseDate : function(date) {
      profile.setReleaseDate(date);
    },

    setVoiceControl: function(voice) {
      profile.setVoice_control(voice);
    },

    setPassword: function(newPass) {
      if ($rootScope.user.type == "Parse") {
        $rootScope.user.setPassword(newPass);
        $rootScope.user.save();
      }
    },

    saveProfile : function() {
      var deferred = $q.defer();
      profile.save(null, {
        success: function(gameScore) {
          deferred.resolve();
        },
        error: function(gameScore, error) {
          console.log('Failed to save profile with error ' + error)
          deferred.reject();
        }
      });

      return deferred.promise;
    },

    updateLocation : function() {
      // update the profile
      Parse.GeoPoint.current({
        success: function (point) {
          profile.set('location', point);
          profile.save(null).then(
            function(profile) {
              console.log('Successfully update location');
            },
            function(profile, error) {
              console.log('Failed to update lcoation with error ' + error);
            });
        }
      });
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