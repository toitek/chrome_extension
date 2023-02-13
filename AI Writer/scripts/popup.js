// for receiving event page message
// document.addEventListener('DOMContentLoaded', function() {
//   chrome.runtime.onMessage.addListener(
//       function (request, sender, sendResponse) {
//         console.log( sender.tab ?
//           "from event page:" + sender.tab.url: 
//           "from the extension");
//           if (request.message === "update_selected_text") {
//               sendResponse({ack:"message received"})
//               var selectedText = request.selectedText;
//               document.getElementById("original-text").value = selectedText;
//           }
//       });
// });
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === "update_selected_text") {
//     sendResponse({ack:"message received"})
//       var selectedText = request.selectedText;
//       console.log(selectedText);
//       document.getElementById("original-text").value = selectedText;
//   }
// });

// ensure user is loged in
// chrome.storage.local.get("email", function(result) {
  // if (result.email) {
    
document.addEventListener('DOMContentLoaded', function(){
const correctGrammarBtn = document.getElementById("correct-grammar-btn");
const originalText = document.getElementById("original-text");
const correctedText = document.getElementById("corrected-text");
const changeToneBtn = document.getElementById("change-tone-btn");
const toneSelect = document.getElementById("tone-select");
const tonedText = document.getElementById("toned-text");
let grammarCounter = 0;
let toneCounter = 0;

correctGrammarBtn.addEventListener("click", async () => {
    // Send the original text to the GPT-3 API to get corrected
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-edit-001/edits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        input: originalText.value,
        instruction: "Fix the grammar mistakes",
        temperature: 0.7
      })
    });
    const data = await response.json();
    if (data.hasOwnProperty('choices') && data.choices.length > 0) {
      // Extract the corrected text from the API response
      correctedText.value = data.choices[0].text;
      grammarCounter++;
      // Send the updated grammarCounter value to the server
      await fetch("https://localhost:5000/update_counter", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grammarCounter: grammarCounter
        })
      });
    } else {
      // Handle the case where the API returns an empty array of choices
      correctedText.value = "Sorry, unable to correct the grammar for the provided text";
    }
});

changeToneBtn.addEventListener("click", async () => {
    // Send the original text and the selected tone to the GPT-3 API to get text in that tone
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-edit-001/edits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        input: originalText.value,
        instruction: "Rewrite, with the correct grammar and in a" + toneSelect.value + "tone",
        temperature: 0.5
      })
    });
    const data = await response.json();
if (data.hasOwnProperty('choices') && data.choices.length > 0) {
    // Extract the corrected text from the API response
    tonedText.value = data.choices[0].text;
    toneCounter++;
      // Send the updated grammarCounter value to the server
      await fetch("https://localhost:5000/update_counter", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toneCounter: toneCounter
        })
      });
} else {
    // Handle the case where the API returns an empty array of choices
    tonedText.value = "Sorry, unable to change the tone for the provided text";
}
})
});
// }
// });

// document.querySelector("#signout").addEventListener("click", function() {
//   window.open("https://localhost:5000/logout");
//   });

// selected text to appear in text arear of popup
// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.message === "update_selected_text") {
//       // Update the text area with the selected text
//       document.getElementById("inputText").value = request.selectedText;
//     }
//   });
