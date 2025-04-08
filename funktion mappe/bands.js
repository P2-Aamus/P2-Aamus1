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
      const timestamp = new Date().toLocaleString('en-GB');
      bandPosts.push({ type, description, phone, email, timestamp });
      saveBandPosts();
      renderBandPosts();
    }
  
    // Function to delete a band post
    function deleteBandPost(index) {
      bandPosts.splice(index, 1);
      //saveBandPosts();
      renderBandPosts();
    }
  
    // Function to save band posts to local storage
    function saveBandPosts() {
      localStorage.setItem("bandPosts", JSON.stringify(bandPosts));

      fetch('http://localhost:3000/api/find_band', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          soeger_band: radioSøgerBand ? true : false,
          soeger_medlemmer: radioSøgerMedlem? true : false,
          title: omJer.value,
          tlf_nr: tlfNr.value,
          mail: mail.value,
          time: new Date().toLocaleTimeString('en-GB'),
          date: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
        })
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
    
    }
    
  
    // Function to render band posts on the message board
    async function renderBandPosts() {
      bandMessageBoard.innerHTML = "";


      let responseRaw= await fetch('http://localhost:3000/api/get_find_band');
      let response = await responseRaw.json();


     for (let post of response) {
        const postDiv = document.createElement("div");
        postDiv.classList.add("notice");
        postDiv.innerHTML = `
            <h3>${post.soeger_band? "Søger Band" : "Søger Medlem"}</h3>
            <p>${post.title}</p>
            <p><strong>Tlf:</strong> ${post.tlf_nr}</p>
            <p><strong>Mail:</strong> ${post.mail}</p>
            <small>${post.date.split('T')[0]}</small>
            <small>${post.time}</small>
            <button class="delete-btn" onclick="window.deleteBandPost(${post})">Slet</button>
        `;
        bandMessageBoard.prepend(postDiv);
      }
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
    window.deleteBandPost = deleteBandPost; }
  );

  