// Initialize the counter variable
let counter = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "addSuggestion") {
    console.log("message received from background");

    chrome.storage.sync.get('userEmail', function(data) {
      const email = data.userEmail;
      console.log(email);
      
      // Increment the counter if the suggestion is more than 3 letters long
        if (request.suggestion.length > 3) {
          counter++;
        }
      
      // Send the counter value to the Flask application with email in headers
      fetch('https://localhost:5000/autocomplete_counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Email': email
        },
        body: JSON.stringify({
          counter: counter
        })
      });
    });
  }
});
