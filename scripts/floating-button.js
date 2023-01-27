const button = document.createElement("button");
button.innerHTML = "AI w";
button.classList.add("floating-button");

// Create tooltip container
const tooltip = document.createElement("div");
tooltip.classList.add("options");
tooltip.style.display = "none";

// Create options container
const options = document.createElement("div");
options.classList.add("options-container");

// Create options
const option1 = document.createElement("div");
option1.innerHTML = "Enable";
option1.classList.add("option");
options.appendChild(option1);

const option2 = document.createElement("div");
option2.innerHTML = "Disable";
option2.classList.add("option");
options.appendChild(option2);

// Append options to tooltip
tooltip.appendChild(options);

// Append tooltip to button
button.appendChild(tooltip);

// Show tooltip when button is hovered
button.addEventListener("mouseover", () => {
    tooltip.style.display = "block";
    tooltip.style.position = "absolute";
});

// Hide tooltip when button is not hovered
button.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
});

button.addEventListener("mouseout", (event) => {
    if (event.relatedTarget !== button && event.relatedTarget !== tooltip) {
        tooltip.style.display = "none";
        tooltipVisible = false;
    }
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

// Add click event listener to options
options.addEventListener("click", (event) => {
    if (event.target.classList.contains("option")) {
        // Do something when the option is clicked
        if (event.target.innerHTML === "Enable") {
            console.log("Enable clicked");
        } else if (event.target.innerHTML === "Disable") {
            console.log("Disable clicked");
        }
    }
});


// Add event listener to document body to hide tooltip when not hovered
document.body.addEventListener("mouseover", (event) => {
    if (!event.target.classList.contains("floating-button")) {
        tooltip.style.display = "none";
    }
});