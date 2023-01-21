chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.data) {
        // process the response data
        // ...
        // display the response data
        let textarea = document.getElementsByTagName("textarea")[0];
        textarea.value = request.data.choices[0].text;
      }
    });
  
  document.addEventListener("keyup", function(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      let textarea = document.getElementsByTagName("textarea")[0];
      let prompt = textarea.value;
  
      chrome.runtime.sendMessage({msg: "make_api_call", prompt: prompt}, function(response) {
        // handle errors
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        }
      });
    }
  });
  