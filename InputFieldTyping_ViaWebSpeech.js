// Copyright (c) 2014 Edgar Muentes. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function genericOnClick(info, tab) {
  if (chrome.extension.lastError) {
    console.log("Got error: " + chrome.extension.lastError.message);
  }

  var scriptFilePath = chrome.extension.getURL("web_accessible/content.js");

  var theCode = '(function(){'+
    "var script = document.createElement( 'script' );"+
    "script.id = 'extensionHelper';"+
    "script.type = 'text/javascript';"+
    "script.src = '"+scriptFilePath+"';"+
    "document.body.appendChild(script);"+
  '})();';

  chrome.tabs.executeScript({
    code: theCode
  });
}

// Create one test item for each context type.
var contexts = ["editable"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "VoiceType";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  // console.log("'" + context + "' item:" + id);
}

console.log('Yampire');