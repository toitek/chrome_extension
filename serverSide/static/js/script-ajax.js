const button = document.querySelector('#onetime');

button.addEventListener('click', event => {
    fetch('/payment_onetime')
    .then((result) => { return result.json(); })
    .then((data) => {
        var stripe = Stripe(data.checkout_public_key);
        // console.log(stripe);
        stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: data.checkout_session_id
        }).then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        });
    })
});


// In production, this should check CSRF, and not pass the session ID.
// The customer ID for the portal should be pulled from the
// authenticated user on the server.
document.addEventListener('DOMContentLoaded', async () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('session_id')) {
      const session_id = searchParams.get('session_id');
      document.getElementById('session-id').setAttribute('value', session_id);
    }
  });

