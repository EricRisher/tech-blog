const newFormHandler = async (event) => {
  try {
    event.preventDefault();

    // Collect values from the new post form
    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-desc').value.trim();

    // Check if both title and content are provided
    if (title && content) {
      // Send a POST request to the API endpoint for creating a new post
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the new post creation was successful
      if (response.ok) {
        // Redirect to the profile page after successful post creation
        document.location.replace('/profile');
      } else {
        // Display an alert with the error message if post creation fails
        alert('Failed to create post');
      }
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error during new post creation:', error);
    // Display an alert for unexpected errors
    alert('Failed to create post');
  }
};

/**
 * Async function to handle the deletion of a post.
 */
const delButtonHandler = async (event) => {
  try {
    // Check if the clicked element has a 'data-id' attribute
    if (event.target.hasAttribute('data-id')) {
      // Retrieve the post ID from the 'data-id' attribute
      const id = event.target.getAttribute('data-id');

      // Send a DELETE request to the API endpoint for deleting the specified post
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      // Check if the post deletion was successful
      if (response.ok) {
        // Redirect to the profile page after successful post deletion
        document.location.replace('/profile');
      } else {
        // Display an alert with the error message if post deletion fails
        alert('Failed to delete post');
      }
    }
  } catch (error) {
    // Log any unexpected errors to the console
    console.error('Error during post deletion:', error);
    // Display an alert for unexpected errors
    alert('Failed to delete post');
  }
};

// Attach the newFormHandler function to the button's click event
document
  .querySelector('#new-post-btn')
  .addEventListener('click', newFormHandler);

// Add a click event listener to the document to delegate handling of delete button clicks
document.addEventListener('click', function (event) {
  if (event.target.matches('#del-post-btn')) {
    // Call the delButtonHandler when the delete button is clicked
    delButtonHandler(event);
  }
});