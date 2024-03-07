const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      // Send a POST request to the API endpoint with user credentials
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the login attempt was successful
      if (response.ok) {
        // Redirect to the dashboard page after successful login
        document.location.replace('/dashboard');
      } else {
        // Display an alert with the error message if login fails
        alert(response.statusText);
      }
    } catch (error) {
      // Log any unexpected errors to the console
      console.error('Error during login:', error);
      // Display an alert for unexpected errors
      alert('Failed to log in');
    }
  }
};

// Attach the loginFormHandler to the form's submit event
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);