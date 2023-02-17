// Creates a context menu item
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "AIwriter",
      "title": "AI Writer",
      "contexts": ["selection"]
    });
  });

  
  
  // chrome.runtime.onMessage.addListener(
  //   function (request, sender, sendResponse) {
  //     // console.log(request.data);
  //     // console.log('hey');
  //     if (request.data.state === true) {
  //       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //         let tabId = tabs[0].id;
  //       chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/content.js"] });
  //       // console.log(request.data);
  //       console.log('Enabled');
  //       });
  //     }else if (request.data.state === false) {
  //       console.log('Disabled');
  //     }
  //   });
  
    
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'user') {
        const email = message.data;
        console.log(email)
      }
    })    
    
    
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      if (message.action === "autocompletedTextCounter") {
        const autocompletedTextCounter = message.data;
        // Send the updated grammarCounter value to the server
      await fetch("https://localhost:5000/autocomplete_counter", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          autocompletedTextCounter: autocompletedTextCounter,
          email: email
        })
      });
      }
    });
    
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action == "addSuggestion") {
        // Send the suggestion to the dropdown script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "addSuggestion", suggestion: request.suggestion});
        });
      }
    });
    