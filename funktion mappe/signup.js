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
        alert("User registered successfully!");
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