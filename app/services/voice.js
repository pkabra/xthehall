app.factory('VoiceService', function() {

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en';

  var listeningForCommand = false;
  var keyPhrase = "orange";

  var commands = {};

  var runCommand = function (command) {
    _.each(command, function (c) {
      if (_.has(commands, c)) {
        commands[c](command);
      }
    })
  };

  var commandListener = new webkitSpeechRecognition();
  commandListener.lang = 'en';
  commandListener.onresult = function (event) {
    runCommand(event.results[event.resultIndex][0].transcript.split(" "));
    try {
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