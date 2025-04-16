// Den her side er til at oprette en bruger 
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

      //Til at tjekke om alt er udfyldt
      if (!login || !kodeord || !navn || !tlfnummer) {
        alert("All fields are required.");
        return;
      }
      //Fetcher alt login, kodeord, om man er admin, navn, telefon nummer og hvilke lokaler man har adgang til
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, kodeord, adminid, navn, tlfnummer, lokale1, lokale2, lokale3, lokale4, lokale5, lokale6, lokale7, lokale8 })
      })
      .then(res => res.json())
      .then(data => {
        // Et modal der popper op at du er registreret
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

        // Animationen til at lukke modalet
        document.getElementById("closeModal").addEventListener("click", () => {
          modal.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          modal.style.opacity = "0";
          modal.style.transform = "scale(0.5)";

          // Den har funktionen at gå videre til login
          setTimeout(() => {
            modal.remove();
            window.location.href = "/Login.html"; // Smidder dig over på login siden
          }, 500);
        });
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