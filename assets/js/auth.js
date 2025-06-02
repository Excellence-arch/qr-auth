// Register form handling
document
  .getElementById('register-form')
  ?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Get button elements
    const registerButton = document.getElementById('register-button');
    const registerText = document.getElementById('register-text');
    const registerIcon = document.getElementById('register-icon');
    const registerSpinner = document.getElementById('register-spinner');

    // Disable button and show spinner
    registerButton.disabled = true;
    registerIcon.classList.add('hidden');
    registerSpinner.classList.remove('hidden');
    registerText.textContent = 'Processing...';

    // Client-side validation
    if (!username || !email || !password || !confirmPassword) {
      showErrorModal('Registration Error', 'All fields are required.');
      resetRegisterButton();
      return;
    }

    if (password !== confirmPassword) {
      showErrorModal(
        'Registration Error',
        'Passwords do not match. Please try again.'
      );
      resetRegisterButton();
      return;
    }

    if (password.length < 6) {
      showErrorModal(
        'Registration Error',
        'Password must be at least 6 characters long.'
      );
      resetRegisterButton();
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showErrorModal(
          'Registration Error',
          data.message || 'Registration failed. Please try again.'
        );
        resetRegisterButton();
        return;
      }

      showModal(
        'Registration Successful',
        'Your registration has been completed successfully!'
      );
      document.getElementById('register-form').reset();
      resetRegisterButton();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      showErrorModal(
        'Registration Error',
        'An error occurred while processing your request. Please try again later.'
      );
      resetRegisterButton();
    }
  });

// Login form handling
document
  .getElementById('login-form')
  ?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Get button elements
    const loginButton = document.getElementById('login-button');
    const loginText = document.getElementById('login-text');
    const loginIcon = document.getElementById('login-icon');
    const loginSpinner = document.getElementById('login-spinner');

    // Disable button and show spinner
    loginButton.disabled = true;
    loginIcon.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    loginText.textContent = 'Logging in...';

    // Client-side validation
    if (!username || !password) {
      showErrorModal('Login Error', 'Both username and password are required.');
      resetLoginButton();
      return;
    }

    try {
      const res = await fetch(
        'https://qr-auth-be.onrender.com/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            rememberMe: rememberMe,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showErrorModal(
          'Login Error',
          data.message ||
            'Login failed. Please check your credentials and try again.'
        );
        resetLoginButton();
        return;
      }

      showModal(
        'Login Successful',
        'Welcome back! You have successfully logged in.'
      );
      // Store the token in localStorage or cookies
      localStorage.setItem('authToken', data.data.token);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      // Reset button state
      resetLoginButton();
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      showErrorModal(
        'Login Error',
        'An error occurred while processing your request. Please try again later.'
      );
      resetLoginButton();
    }
  });

// Reset register button to original state
function resetRegisterButton() {
  const registerButton = document.getElementById('register-button');
  const registerText = document.getElementById('register-text');
  const registerIcon = document.getElementById('register-icon');
  const registerSpinner = document.getElementById('register-spinner');

  registerButton.disabled = false;
  registerSpinner.classList.add('hidden');
  registerIcon.classList.remove('hidden');
  registerText.textContent = 'Register';
}

// Reset login button to original state
function resetLoginButton() {
  const loginButton = document.getElementById('login-button');
  const loginText = document.getElementById('login-text');
  const loginIcon = document.getElementById('login-icon');
  const loginSpinner = document.getElementById('login-spinner');

  loginButton.disabled = false;
  loginSpinner.classList.add('hidden');
  loginIcon.classList.remove('hidden');
  loginText.textContent = 'Login';
}

// Check if rememberMe was set and auto-fill if needed
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('rememberMe') === 'true') {
    // You might want to implement a secure way to remember credentials
    // This is just a basic example
    document.getElementById('remember-me').checked = true;
  }
});
