window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        console.log(token);
      });
    });
  };

// gapi.load('auth2', function() {
//   gapi.auth2.init({
//       client_id: '1081264112106-4ai54747vnp6klfocgj85f63tpvmcgev'
//     });
// });

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $("#name").text(profile.getName());
  $(".write").css("display", "block");
  $(".g-signin2").css("display", "none");
}



var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
  auth2.disconnect();
  alert('Successfully signed out.');
  $(".write").css("display", "none");
  $(".g-signin2").css("display", "block");
  
});

