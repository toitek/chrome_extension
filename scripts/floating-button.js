const button = document.createElement("button");
button.innerHTML = "AI w";
button.classList.add("floating-button");

// Create tooltip container
const tooltip = document.createElement("div");
tooltip.classList.add("options");

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

let isTooltipVisible = false;

// Show tooltip when button is hovered
button.addEventListener("mouseover", () => {
    if (!isTooltipVisible) {
        tooltip.style.display = "block";
        isTooltipVisible = true;
    }
});

// Hide tooltip when button is not hovered
tooltip.addEventListener("mouseout", (event) => {
    if (event.relatedTarget !== button) {
        tooltip.style.display = "none";
        isTooltipVisible = false;
    }
});
// Hide the tooltip when button is clicked twice
button.addEventListener("click", () => {
    if (isTooltipVisible) {
        tooltip.style.display = "none";
        isTooltipVisible = false;
    } else {
        tooltip.style.display = "block";
        isTooltipVisible = true;
    }
});

// make the pop appear when the floating button is clicked
button.addEventListener("click", () => {
    chrome.tabs.create({
        url: chrome.extension.getURL("ui/popup.html"),
        active: true
    });
    tooltip.style.display = "none";
    isTooltipVisible = false;
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