app.factory('ProfileService', function() {

  var Profile = Parse.Object.extend({
    className: 'Profile',
    attrs: ['fbid', 'interest', 'avatar', 'nickname', 'hospital_info']
  });

  // singleton
  var profile = new Profile();

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

    setId : function(id) {
      profile.setFbid(id);
      profile.save(null);
    },

    setInterest : function(interest) {
      profile.setInterest(interest);
      profile.save(null);
    },

    setAvatar : function(avatar) {
      profile.setAvatar(avatar);
      profile.save(null);
    },

    setNickname : function(nickname) {
      profile.setNickname(nickname);
      profile.save(null);
    },

    setHospital_info : function(hospital_info) {
      profile.setHospital_info(hospital_info);
      profile.save(null);
    }
  };
});