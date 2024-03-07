async function newFormHandler(event) {
  event.preventDefault();

  // Get values from form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  try {
    // Send a POST request to create a new post
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Redirect to the dashboard if successful
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the error status if unsuccessful
      alert(response.statusText);
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error creating new post:', error);
    alert('Failed to create new post. Please try again.');
  }
}

// Attach the newFormHandler to the form's submit event
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
