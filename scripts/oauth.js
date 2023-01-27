window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        console.log(token);
      });
    });
  };

gapi.load('auth2', function() {
  gapi.auth2.init({
      client_id: '1081264112106-4ai54747vnp6klfocgj85f63tpvmcgev.apps.googleusercontent.com'
    });
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var email = profile.getEmail();
  // Use the email to verify the user's identity
}



var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
  console.log('User signed out.');
  auth2.disconnect();
});

