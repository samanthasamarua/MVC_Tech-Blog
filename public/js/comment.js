const postId = document.querySelector('input[name="post-id"]').value;

console.log('Tech Blog Testing');
console.log(postId);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;
  console.log(commentContent);

  if (commentContent) {
    const response = await fetch('/api/comments', { // Assuming the API endpoint for posting comments is '/api/comments'
      method: 'POST',
      body: JSON.stringify({
        postId,
        commentContent,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
