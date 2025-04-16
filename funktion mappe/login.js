//Basiclly at det er bare til login delen af loginsiden
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  
  
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const loginid = document.getElementById("loginid").value;
    const kodeordid = document.getElementById("kodeordid").value;
    //Her beder den at både brugernavn og kodeord skal skrives ind
    if (!loginid || !kodeordid) {
      alert("Please enter both login and password.");
      return;
    }
    //Hvis både brugernavn og kodeord er der, vil den prøve at hente login
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //Fejlmelding hvis den ikke henter
      if (!response.ok) {
        console.error('Login request failed:', response.status);
        alert('Login failed due to a server error.');
        return;
      }

      const users = await response.json();

      // Her checker den om det der er blevet indtastet matcher nogle af dem der er i databasen
      const userFound = users.some(user => user.login === loginid && user.kodeord === kodeordid);
      //Her hvis den har fundet en user så giver den besked om det er et match, og sender dig videre til kaldenderen 
      if (userFound) {
        localStorage.setItem("firstLoad", "false");
      
        alert("Login successful!");
        window.location.href = '/index.html';

        for (let result of users) {
          if (result.login === loginid){
      //Den skal også tjekke om du har admin adgang, da det giver adgang til ekstra ting
            if (result.adminid === 1) {
              localStorage.setItem("admin", "true");
            } else {
              localStorage.setItem("admin", "false");
            }


            //Den tjekker også hvilke lokaler du er en del af
            if (result.lokale1 === 1) {
              localStorage.setItem("lokale1", "true");
            } else {
              localStorage.setItem("lokale1", "false");
            }

            if (result.lokale2 === 1) {
              localStorage.setItem("lokale2", "true");
            } else {
              localStorage.setItem("lokale2", "false");
            }

            if (result.lokale3 === 1) {
              localStorage.setItem("lokale3", "true");
            } else {
              localStorage.setItem("lokale3", "false");
            }

            if (result.lokale4 === 1) {
              localStorage.setItem("lokale4", "true");
            } else {
              localStorage.setItem("lokale4", "false");
            }

            if (result.lokale5 === 1) {
              localStorage.setItem("lokale5", "true");
            } else {
              localStorage.setItem("lokale5", "false");
            }

            if (result.lokale6 === 1) {
              localStorage.setItem("lokale6", "true");
            } else {
              localStorage.setItem("lokale6", "false");
            }

            if (result.lokale7 === 1) {
              localStorage.setItem("lokale7", "true");
            } else {
              localStorage.setItem("lokale7", "false");
            }

            if (result.lokale8 === 1) {
              localStorage.setItem("lokale8", "true");
            } else {
              localStorage.setItem("lokale8", "false");
            }
          }
        }


      //Hvis der ikke er noget der match i databasen siger den, nej tak du
      } else {
        alert("Invalid login credentials.");
      }

    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  });
});

//Til at både skifte mellem login og opret bruger, men også til animationen af det :P
const showSignupButton = document.getElementById('showSignup');
const switchToLoginButton = document.getElementById('switchToLogin');
const loginFormDiv = document.querySelector('.login-form');
const signupAreaDiv = document.querySelector('.signup-area');


loginFormDiv.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
signupAreaDiv.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

showSignupButton.addEventListener('click', () => {
  loginFormDiv.style.opacity = '0'; 
  loginFormDiv.style.transform = 'translateY(-0.5rem)'; 
  setTimeout(() => {
    loginFormDiv.style.display = 'none';
    signupAreaDiv.style.display = 'block';
    signupAreaDiv.style.opacity = '0'; 
    signupAreaDiv.style.transform = 'translateY(-0.5)'; 
    setTimeout(() => {
      signupAreaDiv.style.opacity = '1'; 
      signupAreaDiv.style.transform = 'translateY(0)'; 
    }, 10); 
  }, 300); 
  switchToLoginButton.style.display = 'block'; 
});

switchToLoginButton.addEventListener('click', () => {
  signupAreaDiv.style.opacity = '0'; 
  signupAreaDiv.style.transform = 'translateY(-0.5rem)'; 
  setTimeout(() => {
    signupAreaDiv.style.display = 'none';
    loginFormDiv.style.display = 'block';
    loginFormDiv.style.opacity = '0'; 
    loginFormDiv.style.transform = 'translateY(0.5rem)'; 
    setTimeout(() => {
      loginFormDiv.style.opacity = '1'; 
      loginFormDiv.style.transform = 'translateY(0)'; 
    }, 10); 
  }, 300); 
  switchToLoginButton.style.display = 'none'; 
});
