const button = document.createElement("button");
button.innerHTML = "AI w";
button.classList.add("floating-button");
document.body.appendChild(button);

// make the pop appear when the floating button is clicked
button.addEventListener("click", () => {
    chrome.tabs.create({
        url: chrome.extension.getURL("ui/popup.html"),
        active: true
    });
});

// check for text areas to appear
function checkForFocus() {
    let activeElement = document.activeElement;
    if (activeElement.tagName === "INPUT" && activeElement.type === "text" && window.location.href.includes("mail.google.com")) {
        // Display the floating button here
        document.body.appendChild(button);
        button.style.display = "block";

    } else {
        // Hide the floating button here
        // button.style.display = "none";
    }
}
setInterval(checkForFocus, 100);
