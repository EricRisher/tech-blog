async function deleteFormHandler(event) {
  event.preventDefault();

  // Extract the post ID from the current URL
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  try {
    // Send a DELETE request to delete the specified post
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        post_id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Redirect to the dashboard page after successful post deletion
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the error message if unsuccessful
      alert(response.statusText);
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error deleting post:', error);
    // Display an alert for unexpected errors
    alert('Failed to delete post');
  }
}

// Attach the deleteFormHandler to the button's click event
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteFormHandler);
