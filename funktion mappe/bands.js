document.addEventListener("DOMContentLoaded", () => {
    const bandMessageBoard = document.getElementById("bandMessageBoard");
    const bandForm = document.getElementById("bandForm");
    const radioSøgerBand = document.getElementById("radioSøgerBand");
    const radioSøgerMedlem = document.getElementById("radioSøgerMedlem");
    const omJer = document.getElementById("omJer");
    const tlfNr = document.getElementById("tlfNr");
    const mail = document.getElementById("mail");
  
    let bandPosts = JSON.parse(localStorage.getItem("bandPosts")) || [];

    bandForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      saveBandPosts();
      radioSøgerBand.selected = false;
      radioSøgerMedlem.selected = false;
      omJer.value = "";
      tlfNr.value = "";
      mail.value = "";
      //renderBandPosts();
      
  });

  
  async function deletePost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/api/find_band/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Band post with ID ${postId} deleted successfully`);
            renderBandPosts();
        } else {
            const errorData = await response.json();
            console.error('Error deleting band post:', errorData);
            alert('Fejl ved sletning af opslag.');
        }
    } catch (error) {
        console.error('Network error while deleting band post:', error);
        alert('Netværksfejl ved sletning af opslag.');
    }
}
  
    // Function to save band posts to local storage
    async function saveBandPosts() {
      localStorage.setItem("bandPosts", JSON.stringify(bandPosts));

      await fetch('http://localhost:3000/api/find_band', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          soeger_band: radioSøgerBand.checked,
          soeger_medlemmer: radioSøgerMedlem.checked,
          title: omJer.value,
          tlf_nr: tlfNr.value,
          mail: mail.value,
          time: new Date().toLocaleTimeString('en-GB'),
          date: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
        })
      })
      .then(response => response.json())
      .then(renderBandPosts)
      .catch(error => console.error('Error:', error));

        
    
    }
    
  
    // Function to render band posts on the message board
    async function renderBandPosts() {
      bandMessageBoard.innerHTML = "";

    try {
      let responseRaw = await fetch('http://localhost:3000/api/get_find_band');
      let response = await responseRaw.json();


     for (let post of response) {
        const postDiv = document.createElement("div");
        postDiv.classList.add("notice");
        postDiv.innerHTML = `
            <h3>${post.soeger_band? "Søger Band" : "Søger Medlem"}</h3>
            <p>${post.title}</p>
            <p><strong>Tlf:</strong> ${post.tlf_nr}</p>
            <p><strong>Mail:</strong> ${post.mail}</p>
            <small>${new Date(post.date).toLocaleDateString()}</small>
            <small>${post.time}</small>
                <button type="button" class="delete-btn" data-post-id="${post.id}">Slet</button>`;
        bandMessageBoard.prepend(postDiv);
      }

      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
          button.addEventListener('click', function() {
              const postIdToDelete = this.dataset.postId;
              deletePost(postIdToDelete);
          });
      });
  } catch (error) {
      console.error('Error fetching posts:', error);
      bandMessageBoard.innerHTML = '<p>Kunne ikke hente opslag.</p>'; // Use bandMessageBoard
  }
}
    // Load existing band posts when page loads
    renderBandPosts();
  
    // Make deleteBandPost function globally accessible
    //window.deleteBandPost = deleteBandPost; }
});

  