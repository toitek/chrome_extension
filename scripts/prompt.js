
document.querySelector(".btn-submit").addEventListener("click", function() {
	window.open("http://127.0.0.1:5000/login", "_blank");
  });
  













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