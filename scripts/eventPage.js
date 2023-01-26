// Initialize the extension
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
    "id": "AIwriter",
    "title": "AI Writer",
    "contexts": ["selection"]
 });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "AIwriter" && info.selectionText) {
        chrome.windows.create({
            url: "ui/popup.html",
            type: "popup",
            "left": 800,
            "width": 600,
            "height": 620,
        }, function (window) {
            document.addEventListener("DOMContentLoaded", function() {
                document.getElementById("original-text").value = localStorage.getItem("selection");
              });
        });
    }
});
