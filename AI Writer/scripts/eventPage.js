// Initialize the extension
// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//       "id": "AIwriter",
//       "title": "AI Writer",
//       "contexts": ["selection"]
//     });
//   });
  

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//     if (info.menuItemId === "AIwriter") {    
//         // Open the sidebar script
//     chrome.tabs.executeScript(tab.id, {
//       file: "script.js"
//     });
//     }
//     });
        // // Get the selected text
        // var selectedText = info.selectionText;
        
        // // Send the selected text to the popup script
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //   var activeTab = tabs[0];
          
        //   chrome.tabs.sendMessage(activeTab.id, {message: "update_selected_text", selectedText: selectedText}, function(response) {
        //       console.log(response.ack);
          // });
      // });      
 
