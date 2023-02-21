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
      // Get all textarea elements on the page
      // const textareas = document.getElementsByTagName('textarea');
      
      console.log('Looking for text areas...');
      const textareas = document.querySelectorAll('section, textarea, iframe, [contenteditable=true], [role=textbox], [class*=textarea], [id*=textarea], [name*=textarea], .mce-content-body, textarea#textarea, textarea.textarea, textarea[name="textarea"], [class="main_area text-center"], [id="TtextEdior"], [class="tox tox-tinymce"], [class="mce-content-body"], p, li, h2, h3, h4, h5');
      console.log(`Found ${textareas.length} text areas.`);
    
    // Get all textarea and contenteditable elements on the page
    // const elements = document.querySelectorAll('textarea, [contenteditable=true], [role=textbox], [class*=textarea], [id*=textarea], #tinymce.mce-content-body, [class="tox tox-tinymce"], [class="mce-content-body"]');
    
    // Add input event listener to each element
    // for (let i = 0; i < elements.length; i++) {
      textareas.addEventListener('keydown', async function(event) {
        // Check if the key combination is pressed on the current element
        if (event.ctrlKey && event.key === '>') {
          // Get the last 10 words from the current text in the element
          const currentText = event.target.textContent || event.target.value;
          const words = currentText.trim().split(/\s+/);
          const last10Words = words.slice(-10).join(' ');
    
          // Autocomplete the last 10 words using GPT-3 API
          const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
              prompt: last10Words,
              max_tokens: 2,
              temperature: 0.89
            })
          });
    
          // Parse the response from GPT-3 API
          const data = await response.json();
          const suggestion = data.choices[0].text;
    
          // Highlight the suggestion in a different color
          const suggestionHTML = `<span style="color: blue;">${suggestion}</span>`;
    
          // Insert the suggestion into the element at the appropriate location
          const start = event.target.selectionStart;
          const end = event.target.selectionEnd;
          const newText = currentText.slice(0, start) + suggestionHTML + currentText.slice(end);
          event.target.innerHTML = newText;
        }
      });
    // }
      console.log('Autocomplete enabled');
    }
    
    function disableAutocomplete() {
      // Code to disable autocomplete feature
      console.log('Autocomplete disabled');
    }
    
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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