var menuItem = {
    "id": "AIwriter",
    "title": "AI Writer",
    "contexts": ["selection"]
};

// add the extension to the context menu
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "AIwriter") {
        // Send the selected text to the API for correction
        fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                prompt: info.selectionText,
                max_tokens: 50,
                temperature: 0.7
            })
        })
            .then(response => response.json())
            .then(data => {
                chrome.tabs.create({
                    "url": chrome.extension.getURL("ui/popup.html"),
                    "active": true
                }, function (tab) {
                    chrome.tabs.executeScript(tab.id, {
                        code: document.getElementById("input-field").value = "${data.choices[0].text}"
                    });
                });
            })
            .catch(error => console.error(error));
    }
});
