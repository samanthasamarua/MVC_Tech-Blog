    const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  document.getElementById('toggle-form-btn').addEventListener('click', function() {
    var loginSection = document.getElementById('login-section');
    var signupSection = document.getElementById('signup-section');
    var toggleBtn = document.getElementById('toggle-form-btn');
  
    if (loginSection.style.display === 'none') {
      loginSection.style.display = 'block';
      signupSection.style.display = 'none';
      toggleBtn.textContent = 'Switch to Signup';
    } else {
      loginSection.style.display = 'none';
      signupSection.style.display = 'block';
      toggleBtn.textContent = 'Switch to Login';
    }
  
    // Remove previous event listener to avoid multiple bindings
    document.querySelector('#login-signup-form').removeEventListener('submit', loginFormHandler);
  
    // Add event listener for the login form submit button
    document.querySelector('#login-signup-form').addEventListener('submit', loginFormHandler);
  });
  
  
