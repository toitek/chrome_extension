
chrome.action.onClicked.addListener(function(tab) {
  // console.log('action clicked');
  // chrome.windows.create({
  //   url: "prompt.html",
  //   type: "popup",
  //   width: 500,
  //   height: 500
  // });
  
  // Check if there's an existing login instance in the Chrome storage
  chrome.storage.local.get("userData", function(result) {
  if (result.userData) {
  // Login instance found, open the options popup
  console.log("User data is present in the storage: ", result.userData);
  chrome.action.setPopup({popup: 'ui/options.html'});
  } else {
  // Login instance not found, open the login popup
  console.log("User data is not present in the storage");
  // openLoginPrompt();
  chrome.action.setPopup({popup: 'ui/prompt.html'});
  }
  });
});

// function openLoginPrompt() {
//     chrome.windows.create({
//       url: "/ui/prompt.html",
//       type: "popup"
//     });
//   }

// let clientId = '1081264112106-b15g0kqjjg36d2qmkg1c9jrfvhhjkqu8.apps.googleusercontent.com'
// let redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`
// let nonce = Math.random().toString(36).substring(2, 15)

// chrome.action.onClicked.addListener(function() {
//   const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

//   authUrl.searchParams.set('client_id', clientId);
//   authUrl.searchParams.set('response_type', 'id_token');
//   authUrl.searchParams.set('redirect_uri', redirectUri);
//   // Add the OpenID scope. Scopes allow you to access the user’s information.
//   authUrl.searchParams.set('scope', 'openid profile email');
//   authUrl.searchParams.set('nonce', nonce);
//   // Show the consent screen after login.
//   authUrl.searchParams.set('prompt', 'consent');
// });






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

// self.addEventListener("message", function(event) {
//   if (event.data.type === "user_login") {
//     var email = event.data.data.email;
//     console.log("User logged in:", email);
//     self.clients.matchAll().then(function(clients) {
//       clients.forEach(function(client) {
//         client.postMessage({ type: "showOptionsPage" });
//       });
//     });
//   } else {
//     console.log("User not logged in");
//     self.clients.matchAll().then(function(clients) {
//       clients.forEach(function(client) {
//         client.postMessage({ type: "showPromptPage" });
//       });
//     });
//   }
// });


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
