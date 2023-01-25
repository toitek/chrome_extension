const button = document.createElement("button");
button.innerHTML = "AI w";
button.classList.add("floating-button");

// Create options container
const options = document.createElement("div");
options.classList.add("options");
options.style.display = "none";

// Create options
const option1 = document.createElement("div");
option1.innerHTML = "Option 1";
options.appendChild(option1);

const option2 = document.createElement("div");
option2.innerHTML = "Option 2";
options.appendChild(option2);

const option3 = document.createElement("div");
option3.innerHTML = "Option 3";
options.appendChild(option3);

// Append options to button
button.appendChild(options);

// Show options when button is hovered
button.addEventListener("mouseover", () => {
    options.style.display = "block";
});

// Hide options when button is not hovered
button.addEventListener("mouseout", () => {
    options.style.display = "none";
});

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
document.body.appendChild(button);