// create a stripe client
var stripe = Stripe("{{ os.environ.get('STRIPE_PUBLISHABLE_KEY') }}");

// Create an instance of Elements.
var elements = stripe.elements();

// Create an instance of the card Element.
var card = elements.create('card');

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
      displayError.textContent = event.error.message;
  } else {
      displayError.textContent = '';
  }
});

document.querySelector('#payment').addEventListener('submit', function(event) {
    event.preventDefault();

    // Call stripe.createToken to get a token representing the customer's payment information
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the customer if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server to create a charge
        stripeTokenHandler(result.token);
      }
    });
});
  
  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
  }