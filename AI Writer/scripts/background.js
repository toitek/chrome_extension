// Creates a context menu item
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "AIwriter",
      "title": "AI Writer",
      "contexts": ["selection"]
    });
  });

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      // console.log(request.data);
      // console.log('hey');
      if (request.data.state === true) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          let tabId = tabs[0].id;
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/content.js"] });
        // console.log(request.data);
        console.log('Enabled');
        });
      }else if (request.data.state === false) {
        console.log('Disabled');
      }
    });
  
  
  
  // let isEnabled = true;
  // document.getElementById("switch").addEventListener("change", (event) => {
  //     const isChecked = event.target.checked;
  //     chrome.storage.local.set({ "isEnabled": isChecked }, () => {
  //       console.log("The switch state is saved: ", isChecked);
  //     });
  //   });
    


// chrome.action.onClicked.addListener(function(tab) {
//   // console.log('action clicked');
//   // chrome.windows.create({
//   //   url: "prompt.html",
//   //   type: "popup",
//   //   width: 500,
//   //   height: 500
//   // });
  

// Listen for messages from the content script
// console.log('hey');

