const button = document.createElement("button");
button.innerHTML = "AI w";
button.classList.add("floating-button");

// Create options container
const options = document.createElement("div");
options.classList.add("options-container");
options.style.display = "none";

// Create options
const option1 = document.createElement("div");
option1.innerHTML = "Enable";
options.appendChild(option1);

const option2 = document.createElement("div");
option2.innerHTML = "Disable";
options.appendChild(option2);


// Append options to button
button.appendChild(options);

// Show options when button is hovered
button.addEventListener("mouseover", () => {
    options.style.display = "flex";
    options.style.backgroundColor = "white";
    options.style.border = "1px solid #4CAF50";
    options.style.padding = "10px";
    options.style.borderRadius = "5px";
    options.style.transition = "all 0.5s ease-in-out";
    options.style.left = "-100px";
    options.style.position = "absolute";
    options.style.zIndex = "1";
    option1.style.marginRight = "5px";
    option2.style.marginRight = "5px";
    option3.style.marginRight = "5px";
    option1.style.backgroundColor = "#4CAF50";
    option2.style.backgroundColor = "#4CAF50";
    option3.style.backgroundColor = "#4CAF50";
    option1.style.color = "white";
    option2.style.color = "white";
    option3.style.color = "white";
    option1.style.padding = "5px";
    option2.style.padding = "5px";
    option3.style.padding = "5px";
    option1.style.borderRadius = "5px";
    option2.style.borderRadius = "5px";
    option3.style.borderRadius = "5px";
    option1.style.cursor = "pointer";
    option2.style.cursor = "pointer";
    options.style.backgroundColor = "#f2f2f2";
    options.style.borderRadius = "4px";
    options.style.padding = "8px";
    options.style.position = "absolute";
    options.style.zIndex = "1";
    options.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
    options.style.top = "30px";
    option1.style.cursor = "pointer";
    option1.style.margin = "4px 0";
    option2.style.cursor = "pointer";
    option2.style.margin = "4px 0";
    option3.style.cursor = "pointer";
    option3.style.margin = "4px 0";
});

// Hide options when button is not hovered
button.addEventListener("mouseout", () => {
    options.style.transition = "all 0.5s ease-in-out";
    options.style.left = "-150px";
    options.style.display = "none";
});

// make the pop appear when the floating button is clicked
button.addEventListener("click", () => {
    chrome.tabs.create({
        url: chrome.extension.getURL("ui/popup.html"),
        active: true
    });
});

// make the button draggable


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