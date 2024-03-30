// Define a function to handle form submission for creating a new blog post
const createPostHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the form
    const title = document.querySelector('#blog-name').value.trim();
    const text = document.querySelector('#blog-content').value.trim();
  
    if (title && text) {
      try {
        // Send a POST request to the server to create a new blog post
        const response = await fetch('/api/post', {
          method: 'POST',
          body: JSON.stringify({ title, text }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, reload the page to see the updated list of posts
          location.href= "/dashboard";
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