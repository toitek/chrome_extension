// sidebar functionality
document.querySelector("#sidebar-button").addEventListener("click", function () {
    console.log("Button click detected");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/script.js"] });
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/jquery.js"] }, function () {
            chrome.scripting.executeScript({ target: { tabId: tabId } , files: ["scripts/script.js"] });
        });
    });
});
document.querySelector("#user-button").addEventListener("click", function() {
    	window.open("https://localhost:5000/login", "_blank");
      });
      
          
document.querySelector("#premium-button").addEventListener("click", function() {
    	window.open("https://localhost:5000/dashboard", "_blank");
      });
      
      document.addEventListener('DOMContentLoaded', function() {
        fetch('https://localhost:5000/get_user_email')
          .then(response => response.json())
          .then(data => {
            const email = data.email;
            const emailElement = document.getElementById('user-email');
            emailElement.textContent = email;
            if (email) {
              document.querySelector("#sidebar-button").removeAttribute("disabled");
              chrome.runtime.sendMessage({ type: 'user-email', email: email });
            } else {
              document.querySelector("#sidebar-button").setAttribute("disabled", "true");
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
      
      // document.getElementById("switch").addEventListener("change", (event) => {
      //   const isChecked = event.target.checked;
      //   chrome.storage.local.set({ "isEnabled": isChecked }, () => {
      //     console.log("The switch state is saved: ", isChecked);
      //   });
      // });
      
      
      // document.addEventListener("DOMContentLoaded", function() {
      //   const switchEl = document.getElementById("switch");
      //   if (switchEl) {
      //     chrome.storage.local.get("isEnabled", (result) => {
      //       switchEl.checked = result.isEnabled || false;
      //     });
      //     switchEl.addEventListener("change", (event) => {
      //       const isChecked = event.target.checked;
      //       chrome.storage.local.set({ "isEnabled": isChecked }, () => {
      //         console.log("The switch state is saved: ", isChecked);
      //       });
      //     });
      //   }
      // });
      
      // let isEnabled = true;
      // const toggleButton = document.getElementById("toggle-button");
      // toggleButton.addEventListener("click", () => {
      //     if (isEnabled) {
      //       // Disable the autocomplete feature
      //       isEnabled = false;
      //       document.getElementById("toggle-button").innerText = "Enable Autocomplete";
      //       chrome.runtime.sendMessage({ type: "toggleEnabled", enabled: !isEnabled });
      //     } else {
      //       // Enable the autocomplete feature
      //       isEnabled = true;
      //       document.getElementById("toggle-button").innerText = "Disable Autocomplete";
      //       chrome.runtime.sendMessage({ type: "toggleEnabled", enabled: isEnabled });
      //     }
      //   });
      
      // Get the toggle button
// const toggleButton = document.getElementById("toggleButton");

// // Get the state of the toggle button from the backend endpoint
// fetch("https://localhost:5000/isEnabled")
//   .then((response) => response.json())
//   .then((data) => {
//     // Set the initial state of the toggle button based on the backend response
//     toggleButton.checked = data.isEnabled;
//   });
//   // document.getElementById("toggle-button").innerText = "Disable Autocomplete";

// // Add an event listener to the toggle button to update its state
// toggleButton.addEventListener("change", function () {
//   // Send a message to the content script to update its state
//   chrome.runtime.sendMessage({
//     type: "updateState",
//     isEnabled: toggleButton.checked, 
//   });
//   // Update the state of the toggle button in the backend
//   fetch("https://localhost:5000/toggleButton", {
//     method: "POST",
//   });
// });

      
      