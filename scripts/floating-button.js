const button = document.createElement("button");
button.innerHTML = "AI Writer";
button.classList.add("floating-button");
document.body.appendChild(button);

button.addEventListener("click", () => {
    chrome.tabs.create({
        url: chrome.extension.getURL("ui/popup.html"),
        active: true
    });
});