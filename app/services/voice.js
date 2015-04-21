app.factory('VoiceService', function($rootScope, $location, $compile) {

  var microphoneIcon = $('#voice-toggle');

  var listeningForCommand = false;
  var keyPhrase = "orange";
  var commands = {};

  var recognition, commandListener;

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
    if (_.contains(commands, "home")) {
      $location.path("/home");
    }
    if (_.contains(commands, "new") &&
        _.contains(commands, "chat")) {
      $location.path("/find");
    }
    $rootScope.$apply();
  };

  var runCommand = function (command) {

    if ($rootScope.user.attributes &&
      $rootScope.user.attributes.voice_control) {

      _dataTipPopoverTarget = $("#voice-toggle");
      _dataTipPopoverTarget.popover('show');

      var node = "<div>Listening...</div>" +
          "<div>" + command.join(" ") + "</div>";

      $rootScope.$apply(function() {
        $('.popover-content').empty();
        $('.popover-content').append(($compile(node))($rootScope));
      });

      setTimeout(function() {_dataTipPopoverTarget.popover('hide');}, 5000);
    }

    if (isEasterEgg(command)) {
      alert("I'm sorry " + $rootScope.user.attributes.nickname + ", I'm afraid I can't do that.");
      return;
    }
    if (_.contains(command, "navigate") ||
        (command.join(" ").indexOf("go to") > -1)) {
      navigate(command);
      return;
    }

    if (_.contains(command, "logout")) {
      $rootScope.logout();
      return;
    }

    _.each(command, function (c) {
      if (_.has(commands, c)) {
        console.log("calling " + c);
        commands[c](command);
        return;
      }
    })
  };
  
  if (typeof webkitSpeechRecognition !== "undefined") {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en';

    commandListener = new webkitSpeechRecognition();
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
  }

  if ($location.path() !== "/login" &&
      !_.isUndefined(recognition) &&
      $rootScope.user.attributes &&
      $rootScope.user.attributes.voice_control) {
    _dataTipPopoverTarget = $("#voice-toggle");
    _dataTipPopoverTarget.popover({
        title: "",
        placement: 'bottom',
        container: 'body',
        trigger: 'focus',
        html : true,
        content: "<div id='voice-popover' style='display: inline-block; padding-right: 10px'>Try the voice control feature!</div><a onclick=\"$('#voice-toggle').popover('hide');\" class='glyphicon glyphicon-remove-circle' aria-hidden='true'></a><div>Say <span class='alert-danger' style='font-weight: bold; font-size: 18px'> Orange</span> to start!</div>"
    });

    _dataTipPopoverTarget.popover('show');
  }

  return {
    start: function ()  {
      if (recognition) {
        try {
          recognition.start();
        } catch (err) {
          console.log(err);
        }
      }
    },

    stop: function () {
      if (recognition) {
        recognition.stop();
      }
      if (commandListener) {
        commandListener.stop();
      }
      microphoneIcon.animate({color: "#34495e", "font-size": "20px"});
    },

    setCommands: function (objs) {
      commands = objs;
    }
  };
})