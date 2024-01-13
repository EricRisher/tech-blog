const commentFormHandler = async function (event) {
  event.preventDefault();

  const post_id = document
    .querySelector('.new-comment-form')
    .getAttribute('data-postid');
  const comment_text = document
    .querySelector('#comment_description')
    .value.trim();

  if (comment_text) {
    await fetch('/api/comments', {
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
  }
};

document
  .querySelector('.add-comment-btn')
  .addEventListener('submit', commentFormHandler);