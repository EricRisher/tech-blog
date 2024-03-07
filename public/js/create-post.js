async function newFormHandler(event) {
  event.preventDefault();

  // Get the values from the input fields
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('#content').value;

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
      // Redirect to the dashboard page after successful post creation
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the error message if unsuccessful
      alert(response.statusText);
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error creating post:', error);
    // Display an alert for unexpected errors
    alert('Failed to create post');
  }
}

// Attach the newFormHandler to the button's click event
document.querySelector('.post-btn').addEventListener('click', newFormHandler);
