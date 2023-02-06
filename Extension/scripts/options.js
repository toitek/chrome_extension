document.querySelector("#sidebar-button").addEventListener("click", function () {
    console.log("Button click detected");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/script.js"] });
        console.log("Executed 1");
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/jquery.js"] }, function () {
            chrome.scripting.executeScript({ target: { tabId: tabId } , files: ["scripts/script.js"] });
            console.log("Executed 2");
        });
    });
});
document.querySelector("#user-button").addEventListener("click", function() {
    	window.open("https://localhost:5000/extensionApp/ui/views/auth/register.html", "_blank");
      });