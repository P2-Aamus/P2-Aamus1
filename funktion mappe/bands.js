document.addEventListener("DOMContentLoaded", () => {
    const bandMessageBoard = document.getElementById("bandMessageBoard");
    const bandForm = document.getElementById("bandForm");
    const radioSøgerBand = document.getElementById("radioSøgerBand");
    const radioSøgerMedlem = document.getElementById("radioSøgerMedlem");
    const omJer = document.getElementById("omJer");
    const tlfNr = document.getElementById("tlfNr");
    const mail = document.getElementById("mail");
  
    let bandPosts = JSON.parse(localStorage.getItem("bandPosts")) || [];
  
    // Function to add a band post
    function addBandPost(type, description, phone, email) {
      const timestamp = new Date().toLocaleString();
      bandPosts.push({ type, description, phone, email, timestamp });
      saveBandPosts();
      renderBandPosts();
    }
  
    // Function to delete a band post
    function deleteBandPost(index) {
      bandPosts.splice(index, 1);
      saveBandPosts();
      renderBandPosts();
    }
  
    // Function to save band posts to local storage
    function saveBandPosts() {
      localStorage.setItem("bandPosts", JSON.stringify(bandPosts));
    }
  
    // Function to render band posts on the message board
    function renderBandPosts() {
      bandMessageBoard.innerHTML = "";
      bandPosts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("notice");
        postDiv.innerHTML = `
            <h3>${post.type === "SØGER" ? "Søger Band" : "Søger Medlem"}</h3>
            <p>${post.description}</p>
            <p><strong>Tlf:</strong> ${post.phone}</p>
            <p><strong>Mail:</strong> ${post.email}</p>
            <small>${post.timestamp}</small>
            <button class="delete-btn" onclick="window.deleteBandPost(${index})">Slet</button>
        `;
        bandMessageBoard.prepend(postDiv);
      });
    }
  
    // Form submit event listener
    bandForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const type = radioSøgerBand.checked ? "SØGER" : "LEDER";
      addBandPost(type, omJer.value, tlfNr.value, mail.value);
      omJer.value = "";
      tlfNr.value = "";
      mail.value = "";
    });
  
    // Load existing band posts when page loads
    renderBandPosts();
  
    // Make deleteBandPost function globally accessible
    window.deleteBandPost = deleteBandPost;
  });