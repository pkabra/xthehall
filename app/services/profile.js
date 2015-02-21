app.factory('ProfileService', function($q) {

  var Profile = Parse.Object.extend({
    className: 'Profile',
    attrs: ['fbid', 'image', 'interest', 'avatar', 'nickname', 'hospital_info']
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
      var query = new Parse.Query('Profile');
      query.equalTo('fbid', id.toString());
      query.find().then(
        function(result) {
          if (result.length == 0) {
            profile = new Parse.Object('Profile');
            profile.setFbid(id.toString());
            profile.save(null).then(
              function(profile) {
                console.log('Successfully created a new profile');
              },
              function(profile, error) {
                console.log('Failed to create a new profile with error ' + error);
              });
          } else {
            profile = result[0];
          }
        },
        function(error) {
          console.log('Failed to retrieve profile with id' + id.toString());
        });
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

    setInterest : function(interest) {
      profile.setInterest(interest);
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
    }
  };
});