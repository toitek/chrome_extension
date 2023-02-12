document.querySelector("#sidebar-button").addEventListener("click", function () {
    console.log("Button click detected");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/script.js"] });
        console.log("Executed 1");
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/jquery.js"] }, function () {
            chrome.scripting.executeScript({ target: { tabId: tabId } , files: ["scripts/script.js"] });
            console.log("Executed 2");
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
            } else {
              document.querySelector("#sidebar-button").setAttribute("disabled", "true");
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
      
      document.getElementById("switch").addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        chrome.storage.local.set({ "isEnabled": isChecked }, () => {
          console.log("The switch state is saved: ", isChecked);
        });
      });
      