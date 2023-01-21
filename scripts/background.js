let access_token = "";
let expires_at = 0;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg === "make_api_call") {
      // check if access token is valid
      if (Date.now() >= expires_at) {
        // refresh the access token
        refreshAccessToken().then(() => {
          makeApiCall(request.prompt).then(data => {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {data: data});
              chrome.storage.local.set({'response_data': data}, () => {
                console.log('response_data stored successfully.');
              });
            });
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });
      } else {
        makeApiCall(request.prompt).then(data => {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: data});
            chrome.storage.local.set({'response_data': data}, () => {
              console.log('response_data stored successfully.');
            });
          });
        }).catch(error => {
          console.log(error);
        });
      }
    }
  });

function refreshAccessToken() {
  return fetch("https://api.openai.com/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer <API_KEY>"
    },
    body: JSON.stringify({
    "grant_type": "client_credentials"
    })
    })
    .then(response => {
    if(!response.ok) {
    throw new Error(response.statusText);
    }
    return response.json();
    })
    .then(data => {
    access_token = data.access_token;
    expires_at = Date.now() + (data.expires_in * 1000);
    })
    .catch(error => {
    throw error;
    });
    }
    
    function makeApiCall(prompt) {
    return fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + access_token
    },
    body: JSON.stringify({
    "prompt": prompt,
    "max_tokens": 100
    })
    })
    .then(response => {
    if(!response.ok) {
    throw new Error(response.statusText);
    }
    return response.json();
    })
    .then(data => {
    // Process the response data
    // ...
    return data;
    })
    .catch(error => {
    throw error;
    });
    }
    
    
