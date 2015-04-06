app.factory('VoiceService', function($rootScope) {

  var microphoneIcon = $('#voice-toggle');

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en';

  var listeningForCommand = false;
  var keyPhrase = "orange";

  var commands = {};

  var isEasterEgg = function (command) {
    return _.contains(command, "open") && _.contains(command, "pod") && _.contains(command, "bay") && _.contains(command, "doors");
  };

  var navigate = function (commands) {
    if (_.contains(commands, "settings")) {
      $location.path("/profile_settings");
    }
    if (_.contains(commands, "find")) {
      $location.path("/find");
    }
    if (_.contains(commands, "new") &&
        _.contains(commands, "chat")) {
      $location.path("/find");
    }
    $rootScope.$apply();
  };

  var runCommand = function (command) {
    console.log(command);
    console.log(commands);
    if (isEasterEgg(command)) {
      alert("I'm sorry " + $rootScope.user.attributes.nickname + ", I'm afraid I can't do that.");
      return;
    }
    console.log("here");
    if (_.contains(command, "navigate") ||
        (command.join(" ").indexOf("go to") > -1)) {
      navigate(command);
    console.log("trying this");
      return;
    }

    console.log("here");

    if (_.contains(command, "logout")) {
      $rootScope.logout();
      return;
    }

    console.log("here");

    _.each(command, function (c) {
      if (_.has(commands, c)) {
        console.log("calling " + c);
        commands[c](command);
        return;
      }
    })
  };

  var commandListener = new webkitSpeechRecognition();
  commandListener.lang = 'en';
  commandListener.onresult = function (event) {
    runCommand(event.results[event.resultIndex][0].transcript.split(" "));
    try {
      microphoneIcon.animate({color: "#34495e", "font-size": "20px"});
      recognition.start();
    } catch (err) {
      console.log(err);
    }
  };

  recognition.onresult = function (event) {
    if (_.contains(event.results[event.resultIndex][0].transcript.split(" "), keyPhrase)) {
      console.log("listening...");
      recognition.abort();
      recognition.stop();
      try {
        microphoneIcon.animate({color: "#c0392b", "font-size": "26px"});
        commandListener.start();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return {
    start: function ()  {
      recognition.start();
    },

    stop: function () {
      recognition.stop();
    },

    setCommands: function (objs) {
      commands = objs;
    }
  };
})