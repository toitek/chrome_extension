var menuItem = {
    "id": "AIwriter",
    "title": "AI Writer",
    "contexts": ["selection"]
};

// add the extension to the context menu
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "AIwriter") {
        // Get the selected text
        var selectedText = info.selectionText;
        
        // Create a new tab and open an HTML file
        chrome.tabs.create({
            "url": chrome.extension.getURL("ui/popup.html"),
            "active": true
        }, function (tab) {
            // Inject a script into the new tab
            chrome.tabs.executeScript(tab.id, {
                code: `document.getElementById("original-text").value = "${selectedText}";`
            });
        });
    }
});
