// Create a new div element for the suggestion dropdown
const suggestionDropdown = document.createElement('div');
suggestionDropdown.classList.add('suggestion-dropdown');

// Create a new div element for the dropdown content
const dropdownContent = document.createElement('div');
dropdownContent.classList.add('dropdown-content');

// Append the dropdown content to the suggestion dropdown
suggestionDropdown.appendChild(dropdownContent);

// Insert the suggestion dropdown after the textarea element
const textarea = document.querySelector('textarea');
textarea.parentNode.insertBefore(suggestionDropdown, textarea.nextSibling);

// Style the suggestion dropdown with CSS
const css = `
.suggestion-dropdown {
    position: relative;
    display: inline-block;
  }
  
  .suggestion-dropdown .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    border: 1px solid #ddd;
    z-index: 1;
  }
  
  .suggestion-dropdown:hover .dropdown-content {
    display: block;
  }
  `;
const style = document.createElement('style');
style.innerHTML = css;
document.head.appendChild(style);

  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "addSuggestion") {
      // Add the suggestion to the dropdown
      console.log("message received from background");
      console.log(request.suggestion);
      
      const dropdownContent = document.querySelector('.dropdown-content');
      dropdownContent.innerHTML += `<div class="dropdown-item">${request.suggestion}</div>`;
    } 
  });
  
//    // Add click event listener to the suggestion dropdown
//    dropdownContent.addEventListener('click', function() {
//     // Insert the suggestion into the textarea at the appropriate location
//     const start = event.target.selectionStart;
//     const end = event.target.selectionEnd;
//     const newText = currentText.slice(0, start) + suggestion + currentText.slice(end);
//     event.target.value = newText;
//     dropdown.remove();
//   });