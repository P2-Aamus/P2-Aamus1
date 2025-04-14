document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const loginInput = document.getElementById("login");
    const kodeordInput = document.getElementById("kodeord");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const login = loginInput.value.trim();
      const kodeord = kodeordInput.value.trim();

      console.log("Login:", login);
      console.log("Kodeord:", kodeord);

      if (!login || !kodeord) {
        alert("Both fields are required.");
        return;
      }

      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, kodeord })
      })
      .then(res => res.json())
      .then(data => {
        // Create a modal popup for success message
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "#fff";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        modal.style.borderRadius = "8px";
        modal.style.zIndex = "1000";
        modal.innerHTML = `
          <p>Brugeren er oprettet, gå videre til login!</p>
          <button id="closeModal" style="margin-top: 10px; padding: 5px 10px;">Login</button>
        `;

        document.body.appendChild(modal);

        // Add event listener to close the modal and redirect to login
        document.getElementById("closeModal").addEventListener("click", () => {
          modal.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          modal.style.opacity = "0";
          modal.style.transform = "scale(0.5)";

          // Fade out and scale down the modal before redirecting
          setTimeout(() => {
            modal.remove();
            window.location.href = "/Login.html"; // Redirect to the login page
          }, 500); // Match the transition duration
        });
        console.log(data);
        loginInput.value = "";
        kodeordInput.value = "";
      })
      .catch(err => {
        console.error("Signup error:", err);
        alert("Error during signup.");
      });
    });
  });

/*
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginInput = document.getElementById("username");
    const kodeordInput = document.getElementById("password");

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const login = usernameInput.value;
      const kodeord = passwordInput.value;

      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: login,
          password: kodeord
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Success:", data);
        alert("User registered!");
        loginInput.value = "";
        kodeordInput.value = "";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
    });
  });*/