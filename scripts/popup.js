const correctGrammarBtn = document.getElementById("correct-grammar-btn");
const originalText = document.getElementById("original-text");
const correctedText = document.getElementById("corrected-text");
const changeToneBtn = document.getElementById("change-tone-btn");
const toneSelect = document.getElementById("tone-select");
const tonedText = document.getElementById("toned-text");

correctGrammarBtn.addEventListener("click", async () => {
    // Send the original text to the GPT-3 API to get corrected
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        prompt: originalText.value,
        max_tokens: 50,
        temperature: 0.7
      })
    });
    const data = await response.json();
    // Extract the corrected text from the API response
    correctedText.value = data.choices[0].text;
});
API_KEY='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'

changeToneBtn.addEventListener("click", async () => {
    // Send the original text and the selected tone to the GPT-3 API to get text in that tone
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer${API_KEY}`
      },
      body: JSON.stringify({
        prompt: originalText.value + " tone:" + toneSelect.value,
        max_tokens: 50,
        temperature: 0.7
      })
    });
    const data = await response.json();
    // Extract the text with the selected tone from the API response
    tonedText.value = data.choices[0].text;
});
