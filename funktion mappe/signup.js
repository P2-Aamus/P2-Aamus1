document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const loginInput = document.getElementById("login");
    const kodeordInput = document.getElementById("kodeord");
    const admindidInput = document.getElementById("adminid");
    const navnInput = document.getElementById("navn");
    const tlfnummerInput = document.getElementById("tlfnummer");
    const lokale1Access = document.getElementById("lokale1Access");
    const lokale2Access = document.getElementById("lokale2Access");
    const lokale3Access = document.getElementById("lokale3Access");
    const lokale4Access = document.getElementById("lokale4Access");
    const lokale5Access = document.getElementById("lokale5Access");
    const lokale6Access = document.getElementById("lokale6Access");
    const lokale7Access = document.getElementById("lokale7Access");
    const lokale8Access = document.getElementById("lokale8Access");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const login = loginInput.value.trim();
      const kodeord = kodeordInput.value.trim();
      const adminid = false;
      const navn = navnInput.value.trim();
      const tlfnummer = tlfnummerInput.value.trim();
      const lokale1 = lokale1Access.checked;
      const lokale2 = lokale2Access.checked;
      const lokale3 = lokale3Access.checked;
      const lokale4 = lokale4Access.checked;
      const lokale5 = lokale5Access.checked;
      const lokale6 = lokale6Access.checked;
      const lokale7 = lokale7Access.checked;
      const lokale8 = lokale8Access.checked;

      console.log("Login:", login);
      console.log("Kodeord:", kodeord)
      console.log("Navn:", navn);
      console.log("Tlfnummer:", tlfnummer);
      ;

      if (!login || !kodeord || !navn || !tlfnummer) {
        alert("All fields are required.");
        return;
      }

      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, kodeord, adminid, navn, tlfnummer, lokale1, lokale2, lokale3, lokale4, lokale5, lokale6, lokale7, lokale8 })
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
        lokale1Access.checked;
        lokale2Access.checked;
        lokale3Access.checked;
        lokale4Access.checked;
        lokale5Access.checked;
        lokale6Access.checked;
        lokale7Access.checked;
        lokale8Access.checked;
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