var capitalize = function(str){ return (str[0].toUpperCase()+str.slice(1,str.length)); };

window.goodListener = new webkitSpeechRecognition();

var that = window.goodListener;

  that.onaudiostart = function(event){
    // console.log('on audio start', event);
  };
  that.onspeechstart = function(event){
    // console.log('I\'m listening!', event);
  };
  that.onresult = function(event){
    var results = event.results;

    if(results.length>0){
      var whatTheUserSaid = results[results.length-1][0].transcript;
      var activeTextField = document.querySelectorAll('.specialWebSpeechClass')[0];
      that.stop();

      activeTextField.value=whatTheUserSaid;

      var theSpeechTargets = document.querySelectorAll('.specialWebSpeechClass');
      if(theSpeechTargets.length>0){
        [].forEach.call(theSpeechTargets, function(obj, idx){
          obj.classList.remove('specialWebSpeechClass');
        });
      }

    }else{
      console.log('I didn\'t hear you');
    }
  };
  that.onnomatch = function(event){
    // console.log('Could\'nt figure out what you said', event);
  };
  that.onerror = function(event){
    //console.log('uh-oh spaghetti-o\'s, ran into an error', event);
  };

window.goodListener.start();