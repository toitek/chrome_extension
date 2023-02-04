function handleCredentialResponse(response) {
	// decodeJwtResponse() is a custom function
	// to decode the credential response.
	const responsePayload = decodeJwtResponse(response.credential);

	console.log("ID: " + responsePayload.sub);
	console.log('Full Name: ' + responsePayload.name);
	console.log('Given Name: ' + responsePayload.given_name);
	console.log('Family Name: ' + responsePayload.family_name);
	console.log("Image URL: " + responsePayload.picture);
	console.log("Email: " + responsePayload.email);
	console.log("Email_verified: " + responsePayload.email_verified);

	
	const userData = {
		id: responsePayload.sub,
		fullName: responsePayload.name,
		givenName: responsePayload.given_name,
		familyName: responsePayload.family_name,
		imageUrl: responsePayload.picture,
		email: responsePayload.email,
		Email_verified: responsePayload.email_verified
	};
	
	// Send the user data to the Flask app.
	fetch("http://127.0.0.1:5000/api/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userData)
	});
 }
 function decodeJwtResponse(data){
	var tokens = data.split(".");
	return JSON.parse(atob(tokens[1]));
 }