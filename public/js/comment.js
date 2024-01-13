const commentFormHandler = async function (event) {
  event.preventDefault();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  if (comment_text) {
    try {
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

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.add-comment-btn')
  .addEventListener('click', commentFormHandler);