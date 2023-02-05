
// document.querySelector(".btn-submit").addEventListener("click", function() {
// 	window.open("https://localhost:5000/login", "_blank");
//   });
  
  
document.getElementById("submit").addEventListener("click", function() {
  var email = document.getElementById("txt-email").value;

  // Make a request to the server to check if the email is present in the database
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://localhost:5000/check-email?email=" + email, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.emailPresent) {
          // Email is present in the database, open the options page
          openOptionsPopup();
        } else {
          // Email is not present in the database, open the login page
          openLoginPopup();
        }
      } else {
        // Error occurred, open the login page
        openLoginPopup();
      }
    }
  };
  xhr.send();
});

function openOptionsPopup() {
  chrome.windows.create({
    url: "/ui/options.html",
    type: "popup",
    width: 250,
    height: 400
  });
}

function openLoginPopup() {
  chrome.windows.create({
    url: "https://localhost:5000/login",
    type: "popup",
    width: 500,
    height: 500
  });
}



// function openOptionsPopup() {
//   var iframe = document.createElement("iframe");
//     iframe.src = "ui/options.html";
//     iframe.style.width = "250px";
//     iframe.style.height = "400px";
//     document.body.appendChild(iframe);
    
//     window.opener.close();
// }










// const nonce = btoa(String(Math.random())).substr(0, 16);

// document.head.innerHTML = `
//   <meta http-equiv="Content-Security-Policy" content="script-src 'self'">
// `;


// fetch('https://accounts.google.com/gsi/client')
//   .then(response => response.text())
//   .then(scriptText => {
	
//     const script = document.createElement('script');
//     script.innerHTML = scriptText;
// 	// script.nonce = nonce;
//     document.head.appendChild(script);
//   });


// function handleCredentialResponse(response) {
// 	// decodeJwtResponse() is a custom function
// 	// to decode the credential response.
// 	const responsePayload = decodeJwtResponse(response.credential);

// 	console.log("ID: " + responsePayload.sub);
// 	console.log('Full Name: ' + responsePayload.name);
// 	console.log('Given Name: ' + responsePayload.given_name);
// 	console.log('Family Name: ' + responsePayload.family_name);
// 	console.log("Image URL: " + responsePayload.picture);
// 	console.log("Email: " + responsePayload.email);
//  }