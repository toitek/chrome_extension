function handleCredentialResponse(response) {
	// decodeJwtResponse() is a custom function
	// to decode the credential response.
	const responsePayload = decodeJwtResponse(response.credential);
	
	const userData = {
		id: parseInt(responsePayload.sub, 10),
		email: responsePayload.email,
		givenName: responsePayload.given_name,
		familyName: responsePayload.family_name,
		imageUrl: responsePayload.picture,
		Email_verified: responsePayload.email_verified
	};
	
fetch("https://localhost:5000/api/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(userData)
})
.then(response => response.json())
.then(data => {
  console.log("Data saved successfully:", data);
})
.catch(error => {
  console.error("Error saving data:", error);
});

 }
 function decodeJwtResponse(data){
	var tokens = data.split(".");
	return JSON.parse(atob(tokens[1]));
 }