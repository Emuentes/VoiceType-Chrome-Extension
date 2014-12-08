//content script
var activeTarget;
var contextMenuIsOpen = false; 

function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );};
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}

var contextMenuEventFunc = function(event) {
  activeTarget = event.target;
  // console.log('right-clicked (contextmenu)', event.target);

  // add activeTarget identifier class
  activeTarget.classList.add('specialWebSpeechClass');
  var contextMenuIsOpen = true;
};

var contextMenuExitEventFunc = function(event) {
  if(contextMenuIsOpen){
    // remove active target identifier class
    var theSpeechTargets = document.querySelectorAll('.specialWebSpeechClass');
    if(theSpeechTargets.length>0){
      [].forEach.call(theSpeechTargets, function(obj, idx){
        obj.classList.remove('specialWebSpeechClass');
      });
    }
  }
};

var theTargets = document.querySelectorAll('input');
for(var i = 0; i<theTargets.length; i++){
  // add contextmenu event listener to theTargets
  addEvent(theTargets[i], 'contextmenu', contextMenuEventFunc);
}
addEvent(window, 'blur', contextMenuExitEventFunc);

//console.log('content scripts loaded');