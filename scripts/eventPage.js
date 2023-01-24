var menuItem = {
    "id": "AIwriter",
    "title": "AI Writer",
    "contexts": ["selection"]
};

// context menu 
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "AIwriter") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { text: info.selectionText }, function (response) {
            });
        });
    }
});