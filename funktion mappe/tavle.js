//Den her side er til ballersne der vil lave opslag og fremme seje ting i foreningen
document.addEventListener("DOMContentLoaded", () => {
  const messageBoard = document.getElementById("messageBoard");
  const postForm = document.getElementById("postForm");
  const postTitle = document.getElementById("postTitle");
  const postContent = document.getElementById("postContent");
  

  let posts = null;
  messageBoard.innerHTML = "";

  // Lave en post
  function addPost(title, content) {
    savePosts();
  }

  renderPosts();
  //Her sletter vi en posts fra databasen, med deres postid
  async function deletePost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/api/opslagstavle/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Band post with ID ${postId} deleted successfully`);
            renderPosts();
        } else {
            const errorData = await response.json();
            console.error('Error deleting post:', errorData);
            alert('Fejl ved sletning af opslag.');
        }
    } catch (error) {
        console.error('Network error while deleting post:', error);
        alert('Netværksfejl ved sletning af opslag.');
    }
}

  // Den her funktion er så til at gemme posts på opslagstavlen
  async function savePosts() {
    messageBoard.innerHTML = "";
    await fetch('http://localhost:3000/api/opslagstavle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: postTitle.value,
        content: postContent.value,
        time: new Date().toLocaleTimeString('en-GB'),
        date: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
      })
    })
    .then(response => response.json())
    .then(renderPosts)
    .catch(error => console.error('Error:', error));

  }

  // Her får vi posts frem, den indlæsser dem
  async function renderPosts() {
    messageBoard.innerHTML = "";

    try {
   let responseRaw= await fetch('http://localhost:3000/api/get_opslagstavle');
   let response = await responseRaw.json();
      //Her bliver der brugt innerhtml til at få de ting der bliver skrevet frem
    for (let post of response) {
      const postDiv = document.createElement("div");
      postDiv.classList.add("notice");
      postDiv.innerHTML = `
          <h3>${post.title}</h3> 
          <p1>${post.content}</p1>
          <small>${new Date(post.date).toLocaleDateString()}</small>
          <small>${post.time}</small>
          <button type="button" class="delete-btn" data-post-id="${post.id}">Slet</button>`;
          //Den her linje lige over bliver brugt flere gange i løbet af det hele, men den er lidt sjov
          //Esstienlt bruger den post ID'et, til at fortælle hvad der skal slettets
      messageBoard.prepend(postDiv);
    }

    //Sørger for at post kan slettes
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postIdToDelete = this.dataset.postId;
            deletePost(postIdToDelete);
        });
    });
} catch (error) {
    console.error('Error fetching posts:', error);
    messageBoard.innerHTML = '<p>Kunne ikke hente opslag.</p>'; 
}
}

  //Eventlistener til at sumbit en post
  postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addPost(postTitle.value, postContent.value);
    postTitle.value = "";
    postContent.value = "";
  });

  
  window.deletePost = function(index) {
    posts.splice(index, 1);
    renderPosts();
  };
});

//Baller funktion til at fjerne og vise opslagstavle, dine tider og find bands
//Den her er til at få dine tider frem
(function() {
    $('#dineTiderButton').click(function() {
      if ($('#one-content').hasClass('hide')) {
        $('#one-content').removeClass('hide');
        $('#one-content').addClass('show');
        $('#two-content').removeClass('show');
        $('#two-content').addClass('hide');
        $('#three-content').removeClass('show');
        $('#three-content').addClass('hide');
      } else {
        $('#one-content').addClass('hide');
        $('#one-content').removeClass('show');
        
        
      }
    });
  })();

//Den her er til at få opslagstavle frem
(function() {
  $('#noticeBoardButton').click(function() {
    if ($('#two-content').hasClass('show')) {
      $('#two-content').removeClass('show');
      $('#two-content').addClass('hide');
      
      
    } else {
      $('#two-content').addClass('show');
      $('#two-content').removeClass('hide');
      $('#one-content').addClass('hide');
      $('#one-content').removeClass('show');
      $('#three-content').removeClass('show');
      $('#three-content').addClass('hide');
      
    }
  });
})();
  
//Den her er til at få find bands frem
(function() {
  $('#findBandsButton').click(function() {
    if ($('#three-content').hasClass('show')) {
      $('#three-content').removeClass('show');
      $('#three-content').addClass('hide');
    } else {
      $('#three-content').addClass('show');
      $('#three-content').removeClass('hide');
      $('#two-content').removeClass('show');
      $('#two-content').addClass('hide');
      $('#one-content').addClass('hide');
      $('#one-content').removeClass('show');
      
    }
  });
})();




