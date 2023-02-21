// Creates a context menu item
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "AIwriter",
      "title": "AI Writer",
      "contexts": ["selection"]
    });
    
  });

  
  chrome.storage.sync.get('state', function(data) {
    if (data.state) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleAutocomplete', autocompleteEnabled: true});
      });
      console.log("extension active");
      
    } else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleAutocomplete', autocompleteEnabled: false});
      });
      console.log("extension inactive");
    }
  });
  
    
    // receive the email and send it to dropdown script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'user') {
        const email = message.data;
        // console.log(email)
        // chrome.runtime.sendMessage({ action: "user", data: email });
        chrome.storage.sync.set({ 'userEmail': email });
      }
    })    
    
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action == "addSuggestion") {
        // Send the suggestion to the dropdown script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "addSuggestion", suggestion: request.suggestion});
        });
      }
    });
    
 