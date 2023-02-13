let autocompletedText = "";
let autocompletedTextStart = 0;
let autocompletedTextEnd = 0;
// let extensionEnabled = false;
console.log('hey');

// make sure that your extension runs only after the page is fully loaded
window.addEventListener("load", () => {
  let textArea = document.querySelector(".Am.Al.editable.LW-avf");
  const iframe = document.querySelector('.docs-texteventtarget-iframe');
  if (iframe) {
    const textArea = iframe.contentDocument.querySelector('body');
    textArea.addEventListener("focus", () => {
      enableExtension(textArea);
    });
  }

  document.addEventListener("focusin", async (event) => {
    if (event.target.tagName === "TEXTAREA") {
      // Enable the extension when a text area receives focus
      await enableExtension(event.target);
    }
  });

async function enableExtension(textArea) {
    let suggestionAccepted = false;
    textArea.addEventListener("keydown", async (event) => {
      // Check if the pressed key is the space bar
      if (event.code === "Space" && event.code !== ["Space", "Space"]) {
        // Get the text before the cursor
        const text = textArea.value.substring(0, textArea.selectionStart);
        // Split the text into an array of words
        const words = text.split(" ");
        // Get the last four words
        const lastFourWords = words.slice(-4);
        // Use the last four words to understand the context of the text
        const context = lastFourWords.join(" ");
        // Autocomplete the word using GPT-3 API
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          },
          body: JSON.stringify({
            prompt: context,
            max_tokens: 1,
            temperature: 0.89
          })
        });
        const data = await response.json();
        if (typeof data !== "undefined" && data !== null && typeof data.choices !== "undefined" && data.choices !== null) {
          autocompletedText = data.choices[0].text;
          // Insert the autocompleted text into the text area
          textArea.value = text + autocompletedText;
          // Change the color of the autocompleted text to grey
          autocompletedTextStart = text.length;
          autocompletedTextEnd = textArea.value.length;
          textArea.setSelectionRange(autocompletedTextStart, autocompletedTextEnd);
          document.execCommand("ForeColor", false, "grey");
        } else {
          console.log("Data returned from the API is null or undefined")
        }
      }
      if (event.code === "Enter") {
        suggestionAccepted = true;
      }
    });
    textArea.addEventListener("keyup", (event) => {
      console.log("content ok")
      if (suggestionAccepted) {
        // Change the color of the autocompleted text to default
        textArea.setSelectionRange(autocompletedTextStart, autocompletedTextEnd);
        document.execCommand("ForeColor", false, "default");
        // Move the cursor to the end of the autocompleted text
        textArea.selectionStart = textArea.value.length;
        textArea.selectionEnd = textArea.value.length;
      } else {
        // Discard the autocomplete suggestion
        autocompletedText = "";
      }
      suggestionAccepted = false;
    });
  } 
});
