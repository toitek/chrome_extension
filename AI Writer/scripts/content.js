
// make sure that your extension runs only after the page is fully loaded
window.addEventListener("load", () => {
// Get all textarea elements on the page
const textareas = document.getElementsByTagName('textarea');


// Add input event listener to each textarea element
for (let i = 0; i < textareas.length; i++) {
  textareas[i].addEventListener('input', async function(event) {
    // Get the current text in the textarea
    const currentText = event.target.value;

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
    console.log("message sent from content script")
  
    
    // Add the suggestion to the dropdown list below the textarea
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    dropdown.innerHTML = `
      <div class="dropdown-content">${suggestion}</div>
    `;
    event.target.parentNode.insertBefore(dropdown, event.target.nextSibling);

    // Add click event listener to the suggestion dropdown
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    dropdownContent.addEventListener('click', function() {
      // Insert the suggestion into the textarea at the appropriate location
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;
      const newText = currentText.slice(0, start) + suggestion + currentText.slice(end);
      event.target.value = newText;
      dropdown.remove();
    });
    
  });
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