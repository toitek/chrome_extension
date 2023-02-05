chrome.identity.getProfileUserInfo(function(userInfo) {
    var email = userInfo.email;
  
    if (!email) {
      openLoginPopup();
    } else {
      // Make a request to the server to check if the email is present in the database
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://localhost:5000/check-email?email=" + email, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.emailPresent) {
              // Email is present in the database, open the options page
              console.log("email present")
              document.getElementById("popup-content").innerHTML = "Options Page";
            } else {
                console.log("email not present")
              // Email is not present in the database, open the login page
              openLoginPopup();
            }
          } else {
            console.log("error occurred")
            // Error occurred, open the login page
            openLoginPopup();
          }
        }
      };
      xhr.send();
    }
  });
  
  function openLoginPopup() {
    chrome.windows.create({
      url: "https://localhost:5000/login",
      type: "popup",
      width: 500,
      height: 500
    });
  }
  