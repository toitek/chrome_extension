var menuItem = {
    "id": "AIwriter",
    "title": "AI Writer",
    "contexts": ["selection"]
};

// creation of a popup
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "AIwriter") {
        chrome.windows.create({
            url: "ui/popup.html",
            type: "popup",
            "left": 800,
            "width": 600,
            "height": 620,
        }, function (window) {
            chrome.runtime.sendMessage({ selectedText: info.selectionText });
        });
    }
});
