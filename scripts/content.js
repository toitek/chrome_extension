let autocompletedText = "";
let autocompletedTextStart = 0;
let autocompletedTextEnd = 0;
document.addEventListener("focusin", async (event) => {
  if(event.target.tagName === "TEXTAREA") {
      // Enable the extension when a text area receives focus
      await enableExtension(event.target);
  }
});

async function enableExtension(textArea) {
  textArea.addEventListener("keydown", async (event) => {
      // Check if the pressed key is the space bar
      if (event.code === "Space") {
          // Get the text before the cursor
          const text = textArea.value.substring(0, textArea.selectionStart);
          // Get the last word before the cursor
          const lastWord = text.split(" ").pop();
          // Autocomplete the word using GPT-3 API
          try {
              const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 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'
                },
                body: JSON.stringify({
                  prompt: lastWord,
                  max_tokens: 50,
                  temperature: 0.7
                })
              });
              const data = await response.json();
              if (typeof data !== "undefined" && data !== null && typeof data.choices !== "undefined" && data.choices !== null) {
                autocompletedText = data.choices[0].text;
                // Insert the autocompleted text into the text area
                textArea.value = text + autocompletedText;
                // highlight the autocompleted text
                autocompletedTextStart = text.length;
                autocompletedTextEnd = textArea.value.length;
                textArea.setSelectionRange(autocompletedTextStart, autocompletedTextEnd);
document.execCommand("hiliteColor", false, "yellow");

                textArea.classList.add("highlight");
                // Move the cursor to the end of the autocompleted text
                textArea.selectionStart = textArea.value.length;
                textArea.selectionEnd = textArea.value.length;
            } else {
                console.log("Data returned from the API is null or undefined")
            }
          } catch (error) {
              console.error(error);
          }
      }
  });
  textArea.addEventListener("keydown", (event) => {
    // Check if the pressed key is the Enter key
    if (event.code === "Enter") {
        // include the autocompleted text
        autocompletedText = "";
        //remove the highlight
        textArea.classList.remove("highlight");
    }
});
}
