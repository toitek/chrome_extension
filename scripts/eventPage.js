var menuItem = {
    "id": "AIwriter",
    "title": "AI Writer",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "AIwriter") {
        chrome.windows.create({
            url: "ui/popup.html",
            type: "popup",
            width: 600,
            height: 400
        }, function (window) {
            chrome.runtime.sendMessage({ selectedText: info.selectionText });
        });
    }
});