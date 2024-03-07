const signupFormHandler = async (event) => {
  try {
    event.preventDefault();

    // Collect values from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Check if username, email, and password are provided
    if (username && email && password) {
      // Send a POST request to the API endpoint for user signup
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the user signup was successful
      if (response.ok) {
        // Redirect to the dashboard after successful signup
        document.location.replace('/dashboard');
      } else {
        // Display an alert with the error message if signup fails
        alert(response.statusText);
      }
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error during user signup:', error);
    // Display an alert for unexpected errors
    alert('Failed to sign up');
  }
};

// Attach the signupFormHandler function to the form's submit event
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);