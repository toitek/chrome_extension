alert("Please Sign Up with Google first.");

function handleCredentialResponse(response) {
	const responsePayload = decodeJwtResponse(response.credential);
	
	const userData = {
		email: responsePayload.email,
		givenName: responsePayload.given_name,
		familyName: responsePayload.family_name,
		imageUrl: responsePayload.picture,
		Email_verified: responsePayload.email_verified
	};
	
fetch("https://localhost:5000/adduser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(userData)
})
.then(response => {
	// Redirect the user to the dashboard page
	window.location.href = "https://localhost:5000/dashboard";
})
}
function decodeJwtResponse(data){
   var tokens = data.split(".");
   return JSON.parse(atob(tokens[1]));
}











// .then(response => response.json())
// .then(data => {
//   console.log("Data sent successfully:", data);
// })
// .catch(error => {
//   console.error("Error saving data:", error);
// });

// $.ajax({
// 	url: "/api/user",
// 	type: "POST",
// 	data: userData,
// 	success: function(response) {
// 	  if (response.message === "User data saved successfully" || response.message === "User with this email already exists") {
// 		window.close();
// 	  }
// 	}
//   });

// $.ajax({
// 	type: "POST",
// 	url: "/adduser",
// 	data: JSON.stringify(userData),
// 	contentType: "application/json; charset=utf-8",
// 	dataType: "json",
// 	success: function(response) {
// 	  if (response.message === "User data saved successfully" || response.error === "User with this email already exists") {
// 		// Get the service worker registration
// 		// navigator.serviceWorker.getRegistration().then(function(registration) {
// 		// // Check if the service worker is controlling the extension
// 		// if (registration.active) {
// 		// // Send a message to the service worker
// 		// registration.active.postMessage({type: 'user_login', userData: {email: 'email'}});
// 		// }
// 		// });
// 		console.log("message posted:", response)
// 	  }
// 	  else{
// 		console.log("message not posted", response)
// 	  }  
// 	},
// 	error: function(error) {
// 	  console.error(error);
// 	  console.error("Error on login:", error);
// 	}
//   });
  
  

  