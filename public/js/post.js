// Define a function to handle form submission for creating a new blog post
const createPostHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the form
    const title = document.querySelector('#blog-name').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
  
    if (title && content) {
      try {
        // Send a POST request to the server to create a new blog post
        const response = await fetch('/api/post/create', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, reload the page to see the updated list of posts
          location.reload();
        } else {
          // Display an error message if the request fails
          alert('Failed to create the post. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Display an error message if any of the fields are empty
      alert('Please enter both title and content for the post.');
    }
  };
  
  // Add an event listener to the form for creating a new blog post
  document.querySelector('.new-blog-form').addEventListener('submit', createPostHandler);
  
  // Define a function to handle deleting a blog post
  const deletePostHandler = async (event) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const postId = event.target.dataset.id;
  
      try {
        // Send a DELETE request to the server to delete the post
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // If successful, remove the deleted post from the DOM
          event.target.closest('.row').remove();
        } else {
          // Display an error message if the request fails
          alert('Failed to delete the post. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  // Add event listeners to all delete buttons for blog posts
  document.querySelectorAll('.btn-delete-post').forEach((button) => {
    button.addEventListener('click', deletePostHandler);
  });
  