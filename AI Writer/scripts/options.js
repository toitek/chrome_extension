// sidebar functionality
document.querySelector("#sidebar-button").addEventListener("click", function () {
  console.log("Button click detected");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/script.js"] });
    chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/jquery.js"] }, function () {
      chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["scripts/script.js"] });
    });
  });
});

document.querySelector("#user-button").addEventListener("click", function () {
  window.open("https://localhost:5000/login", "_blank");
});

document.querySelector("#premium-button").addEventListener("click", function () {
  window.open("https://localhost:5000/dashboard", "_blank");
});

// Delete account
document.querySelector("#delete-account-button").addEventListener("click", function () {
  if (confirm("Are you sure you want to delete your account?")) {
    // send a request to the server to delete the account
    fetch(`https://localhost:5000/delete_user/${document.getElementById('user-email').textContent}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to delete account: ${response.statusText}`);
        }
      })
      .then(data => {
        if (data.success) {
          alert("Account deleted successfully");
          // reload the page to show the updated state
          window.location.reload();
        } else {
          throw new Error(`Failed to delete account: ${data.error}`);
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }
});

// login, logout and signup buttons
document.addEventListener('DOMContentLoaded', function () {
  fetch('https://localhost:5000/get_user_email')
    .then(response => response.json())
    .then(data => {
      const email = data.email;
      const emailElement = document.getElementById('user-email');
      emailElement.textContent = email;
      const loginButton = document.getElementById('login-button');
      const logoutButton = document.getElementById('logout-button');
      const signupButton = document.getElementById('user-button');
      const deleteButton = document.getElementById('delete-account-button');
      // send email to background
      chrome.runtime.sendMessage({ action: "user", data: email });
      
      if (email) {
        document.querySelector("#sidebar-button").removeAttribute("disabled");
        loginButton.style.display = 'none';
        deleteButton.style.display = 'block';
        logoutButton.style.display = 'block';
        signupButton.style.display = 'none';
        logoutButton.addEventListener("click", function () {
          window.open("https://localhost:5000/logout", "_blank");
        });

      } else {
        document.querySelector("#sidebar-button").setAttribute("disabled", "true");
        loginButton.style.display = 'block';
        deleteButton.style.display = 'none';
        logoutButton.style.display = 'none';
        signupButton.style.display = 'block';
        loginButton.addEventListener("click", function () {
          window.open("https://localhost:5000/login", "_blank");
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
});


// enable/disable
// const toggleButton = document.getElementById("toggle-extension");
// document.addEventListener('DOMContentLoaded', function () {
//   fetch('https://localhost:5000/toggle')
//     .then(response => response.json())
//     .then(data => {
//       if (data.state === true) {
//         toggleButton.textContent = 'Enabled';
//       }
//       else{
//         toggleButton.textContent = 'Disabled';
//       }
//       chrome.runtime.sendMessage({ data: data });
//       chrome.storage.sync.set({ 'state': data });
//     });
//     });

    // enable/disable
    const toggleButton = document.querySelector("#toggle-extension");
    // Retrieve last state from storage and set default text content
    chrome.storage.sync.get("state", function (data) {
      if (data.state === true) {
        toggleButton.textContent = "Enabled";
      } else {
        toggleButton.textContent = "Disabled";
      }
    });

// Listen for button click and toggle state
    document.querySelector("#toggle-extension").addEventListener("click", function () {
      fetch('https://localhost:5000/toggle')
      .then(response => response.json())
      .then(data => {
        if (data.state === true) {
          toggleButton.textContent = 'Enabled';
          console.log("active")
        }
        else{
          toggleButton.textContent = 'Disabled';
          console.log("inactive")
        }
        chrome.storage.sync.set({ 'state': data.state });
      }); 
    });
