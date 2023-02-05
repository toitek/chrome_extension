// chrome.action.onClicked.addListener(function() {
//     chrome.tabs.create({url: 'ui/login.html'});
//   });

// window.addEventListener("message", receiveMessage, false);

// function receiveMessage(event) {
//   if (event.data.type === "user_login") {
//     var email = event.data.data.email;
//     console.log("User logged in:", event.data.data.email);
//     chrome.runtime.sendMessage({type: "showOptionsPage"});
//     // Do something with the email
//   } else {
//     console.log("User not logged in");
//     chrome.runtime.sendMessage({type: "showPromptPage"});
//   }
// }

self.addEventListener("message", function(event) {
  if (event.data.type === "user_login") {
    var email = event.data.data.email;
    console.log("User logged in:", email);
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({ type: "showOptionsPage" });
      });
    });
  } else {
    console.log("User not logged in");
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({ type: "showPromptPage" });
      });
    });
  }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "showOptionsPage") {
    chrome.browserAction.setPopup({popup: 'options.html'});
  } else if (request.type === "showPromptPage") {
    chrome.browserAction.setPopup({popup: 'prompt.html'});
  }
});


  
// chrome.storage.local.get('signed_in', (data) => {
//   if (data.signed_in) {
//     chrome.action.setPopup({popup: 'popup.html'});
//   } else {
//     chrome.action.setPopup({popup: 'popup_login.html'});
//   }
// });

// Initialize the extension
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "AIwriter",
    "title": "AI Writer",
    "contexts": ["selection"]
  });
});


chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "AIwriter") {    
      // Create a new window and open an HTML file
      
          chrome.windows.create({
          url: "ui/popup.html",
          type: "popup",
          "left": 800,
          "width": 600,
          "height": 620,
            });
      
      // Get the selected text
      var selectedText = info.selectionText;
      
      // Send the selected text to the popup script
      chrome.runtime.sendMessage({
            message: "update_selected_text", 
          "selectedText": selectedText
      },function(response){
        console.log(response.ack)
      });
  }
});
