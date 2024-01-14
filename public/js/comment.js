const commentFormHandler = async function (event) {
  event.preventDefault();

  // Extract post_id from the current URL
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Get comment text from the textarea
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  // Check if comment text is not empty
  if (comment_text) {
    try {
      // Send a POST request to create a new comment
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          comment_text,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is successful
      if (response.ok) {
        // Reload the page to display the new comment
        document.location.reload();
      } else {
        // Display an alert with the error message if unsuccessful
        alert('Failed to create comment');
      }
    } catch (error) {
      // Log any unexpected errors to the console
      console.error('Error creating comment:', error);
      // Display an alert for unexpected errors
      alert('Failed to create comment');
    }
  }
};

// Attach the commentFormHandler to the button's click event
document
  .querySelector('.add-comment-btn')
  .addEventListener('click', commentFormHandler);