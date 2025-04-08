document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const loginid = document.getElementById("loginid").value;
    const kodeordid = document.getElementById("kodeordid").value;

    if (!loginid || !kodeordid) {
      alert("Please enter both login and password.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'GET', // Or 'POST' depending on how you want to handle it on the backend
        headers: {
          'Content-Type': 'application/json',
        },
        // If using POST, you would include the body:
        // body: JSON.stringify({ login: loginid, kodeord: kodeordid }),
      });

      if (!response.ok) {
        console.error('Login request failed:', response.status);
        alert('Login failed due to a server error.');
        return;
      }

      const users = await response.json();

      // Check if the entered credentials match any user in the database
      const userFound = users.some(user => user.login === loginid && user.kodeord === kodeordid);

      if (userFound) {
        alert("Login successful!");
        // Redirect to a logged-in page or perform other actions upon successful login
        window.location.href = '/index.html'; // Example redirection
      } else {
        alert("Invalid login credentials.");
      }

    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  });
});

const showSignupButton = document.getElementById('showSignup');
        const switchToLoginButton = document.getElementById('switchToLogin');
        const loginFormDiv = document.querySelector('.login-form');
        const signupAreaDiv = document.querySelector('.signup-area');

        showSignupButton.addEventListener('click', () => {
            loginFormDiv.style.display = 'none';
            signupAreaDiv.style.display = 'block';
            switchToLoginButton.style.display = 'block'; // Show the "Log In" button
        });

        switchToLoginButton.addEventListener('click', () => {
            signupAreaDiv.style.display = 'none';
            loginFormDiv.style.display = 'block';
            switchToLoginButton.style.display = 'none'; // Hide the "Log In" button again (optional, but good for consistency if you were to toggle back to signup)
        });
