API_KEY='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'

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
              const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer' + API_KEY
                },
                body: JSON.stringify({
                  prompt: lastWord,
                  max_tokens: 50,
                  temperature: 0.7
                })
              });
              const data = await response.json();
              // Extract the autocompleted text from the API response
              const autocompletedText = data.choices[0].text;
              // Insert the autocompleted text into the text area
              textArea.value = text.substring(0, text.lastIndexOf(lastWord)) + autocompletedText + textArea.value.substring(textArea.selectionStart);
              // Move the cursor to the end of the autocompleted text
              textArea.selectionStart = textArea.value.length;
              textArea.selectionEnd = textArea.value.length;
          } catch (error) {
              console.error(error);
          }
      }
  });
}
