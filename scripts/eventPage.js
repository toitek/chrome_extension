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
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
          
          chrome.tabs.sendMessage(activeTab.id, {message: "update_selected_text", selectedText: selectedText}, function(response) {
              console.log(response.ack);
          });
      });      
    }
});
