const logout = async () => {
  try {
    // Send a POST request to the API endpoint for user logout
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the logout attempt was successful
    if (response.ok) {
      // Redirect to the home page after successful logout
      document.location.replace('/');
    } else {
      // Display an alert with the error message if logout fails
      alert(response.statusText);
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error during logout:', error);
    // Display an alert for unexpected errors
    alert('Failed to log out');
  }
};

// Attach the logout function to the button's click event
document.querySelector('#logout').addEventListener('click', logout);
