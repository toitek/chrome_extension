// make sure that your extension runs only after the page is fully loaded
window.addEventListener("load", () => {
  
  
// Add event listener to receive messages from background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'toggleAutocomplete') {
    const autocompleteEnabled = message.autocompleteEnabled;
    // Enable or disable autocomplete feature based on message content
    if (autocompleteEnabled) {
      enableAutocomplete();
    } else {
      disableAutocomplete();
    }
  }
});

function enableAutocomplete() {
  // // Get all textarea elements on the page
  // const textareas = document.getElementsByTagName('textarea');
  
  console.log('Looking for text areas...');
      const textareas = document.querySelectorAll('section, textarea, iframe, [contenteditable=true], [role=textbox], [class*=textarea], [id*=textarea], [id="textbox_ifr"], [id="textbox_ifr"], [name*=textarea], .mce-content-body, textarea#textarea, textarea.textarea, textarea[name="textarea"], #main_area text-center, #TtextEdior, .tox tox-tinymce, .mce-content-body, p, li, h2, h3, h4, h5, #notepad, textarea#notepad, div#editable, iframe#ifr_doc body, [role="textbox"][contenteditable="true"], article, .is-selected, #notepad-content');
      
      console.log(`Found ${textareas.length} text areas.`);

  // Add keydown event listener to each textarea element
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('keydown', async function(event) {
      // Check if ctrl, shift, and ArrowRight keys are pressed simultaneously
      if (event.ctrlKey && event.shiftKey && event.key === 'ArrowRight') {
        event.preventDefault();

        // Get the current text in the textarea and the cursor position
        const textarea = event.target;
        const currentText = textarea.value;
        const cursorPosition = textarea.selectionStart;

      // Autocomplete the current text using GPT-3 API
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          prompt: currentText,
          max_tokens: 1,
          temperature: 0.89
        })
      });

      // Parse the response from GPT-3 API
      const data = await response.json();
      const suggestion = data.choices[0].text;
      
      
      // Pass the suggestion to the dropdown script
      chrome.runtime.sendMessage({action: 'addSuggestion', suggestion: suggestion});
      console.log("message sent by content script");

      // Add the suggestion after the cursor
      const newText = currentText.slice(0, cursorPosition) + suggestion + currentText.slice(cursorPosition);
        textarea.value = newText;
        textarea.setSelectionRange(cursorPosition + suggestion.length, cursorPosition + suggestion.length);
      }
      
      // Insert the suggestion at the current cursor position
      // insertSuggestion(suggestion);

      
    });
  }
  console.log('Autocomplete enabled');
}

function disableAutocomplete() {
  // Code to disable autocomplete feature
  console.log('Autocomplete disabled');
}
});


function insertSuggestion(suggestion) {
  // Get the currently active element
  const activeElement = document.activeElement;

  // Check if the active element is a contenteditable div with role "textbox"
  if (activeElement.getAttribute("contenteditable") === "true" && activeElement.getAttribute("role") === "textbox") {
    // Get the current selection and range
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Create a new text node with the suggestion
    const suggestionNode = document.createTextNode(suggestion);

    // Insert the suggestion at the current selection
    range.deleteContents();
    range.insertNode(suggestionNode);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}





















    // const css = `.dropdown {
    //   position: relative;
    // }
    
    // .dropdown .dropdown-content {
    //   position: absolute;
    //   top: 100%;
    //   left: 0;
    //   z-index: 2147483647;
    //   background-color: #f9f9f9;
    //   min-width: 160px;
    //   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    //   padding: 12px 16px;
    //   border-radius: 6px;
    // }
    // .suggestion-dropdown {
    //   position: relative;
    //   display: inline-block;
    // }
    
    // .dropdown-content {
    //   display: none;
    //   position: absolute;
    //   background-color: #f9f9f9;
    //   min-width: 160px;
    //   border: 1px solid #ddd;
    //   z-index: 1;
    // }
    
    // .suggestion-dropdown:hover .dropdown-content {
    //   display: block;
    // }
    // `
    // const style = document.createElement('style');
    // style.innerHTML = css;
    // document.head.appendChild(style);



// // Helper function to create a new suggestion dropdown for a given textarea
// function createSuggestionDropdown(textarea) {
//   // Create a new div element for the suggestion dropdown
//   const suggestionDropdown = document.createElement('div');
//   suggestionDropdown.classList.add('suggestion-dropdown');

//   // Create a new div element for the dropdown content
//   const dropdownContent = document.createElement('div');
//   dropdownContent.classList.add('dropdown-content');

//   // Append the dropdown content to the suggestion dropdown
//   suggestionDropdown.appendChild(dropdownContent);

//   // Insert the suggestion dropdown after the textarea element
//   textarea.parentNode.insertBefore(suggestionDropdown, textarea.nextSibling);

//   // Style the suggestion dropdown with CSS
//   const css = `
//     .suggestion-dropdown {
//       position: relative;
//       display: inline-block;
//     }

//     .dropdown-content {
//       display: none;
//       position: absolute;
//       background-color: #f9f9f9;
//       min-width: 160px;
//       border: 1px solid #ddd;
//       z-index: 1;
//     }

//     .suggestion-dropdown:hover .dropdown-content {
//       display: block;
//     }
//   `;
//   const style = document.createElement('style');
//   style.innerHTML = css;
//   document.head.appendChild(style);

//   return suggestionDropdown;
// // }