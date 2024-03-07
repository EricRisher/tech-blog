async function editFormHandler(event) {
  event.preventDefault();

  // Extract the post ID from the current URL
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Get the values from the form inputs and trim any leading/trailing whitespaces
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('#content').value.trim();

  try {
    // Send a PUT request to update the specified post
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
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
      // Redirect to the dashboard page after successful post update
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the error message if unsuccessful
      alert(response.statusText);
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error updating post:', error);
    // Display an alert for unexpected errors
    alert('Failed to update post');
  }
}

// Attach the editFormHandler to the button's click event
document.querySelector('#save-btn').addEventListener('click', editFormHandler);
