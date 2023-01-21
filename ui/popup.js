const submitButton = document.getElementById("submit-button");
const prompt = document.getElementById("prompt");
const responseDiv = document.getElementById("response");

submitButton.addEventListener("click", function() {
  // make the API call and send the prompt
  chrome.runtime.sendMessage({msg: "make_api_call", prompt: prompt.value}, function(response) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    }
    else {
        // display the response data
        responseDiv.innerHTML = response.data;
        }
        });
        });