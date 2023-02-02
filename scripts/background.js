// chrome.action.onClicked.addListener(function() {
//     chrome.tabs.create({url: 'index.html'});
//   });

chrome.storage.local.get('signed_in', (data) => {
  if (data.signed_in) {
    chrome.action.setPopup({popup: 'popup.html'});
  } else {
    chrome.action.setPopup({popup: 'popup_login.html'});
  }
});

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
