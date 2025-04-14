document.addEventListener("DOMContentLoaded", () => {
  const messageBoard = document.getElementById("messageBoard");
  const postForm = document.getElementById("postForm");
  const postTitle = document.getElementById("postTitle");
  const postContent = document.getElementById("postContent");
  const bandMessageBoard = document.getElementById("bandMessageBoard");
  const bandPostForm = document.getElementById("postForm");
  const bandPostTitle = document.getElementById("postTitle");
  const bandPostContent = document.getElementById("postContent")

  let posts = null;
  messageBoard.innerHTML = "";

  // Function to add a post
  function addPost(title, content) {
    const timestamp = new Date().toLocaleString();
    //posts.push({ title, content, timestamp });
    savePosts();
    //renderPosts();
  }

  // Function to delete a post
  function deletePost(index) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }

  // Function to save posts to local storage
  function savePosts() {
    messageBoard.innerHTML = "";
    fetch('http://localhost:3000/api/opslagstavle', {
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
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    renderPosts();
  }

  // Function to render posts on the message board
  async function renderPosts() {
    messageBoard.innerHTML = "";

   let responseRaw= await fetch('http://localhost:3000/api/get_opslagstavle');
   let response = await responseRaw.json();
    
    
    for (let post of response) {
      const postDiv = document.createElement("div");
      postDiv.classList.add("notice");
      postDiv.innerHTML = `
          <h3>${post.title}</h3> 
          <p1>${post.content}</p1>
          <small>${post.date.split('T')[0]}</small>
          <small>${post.time}</small>
          <button class="delete-btn" onclick="window.deletePost(${post})">Slet</button>`;

      messageBoard.prepend(postDiv);
    }
  }

  

  // Form submit event listener
  postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addPost(postTitle.value, postContent.value);
    postTitle.value = "";
    postContent.value = "";
  });

  

  // Load existing posts when page loads
  renderPosts();

  // Make deletePost function globally accessible and use the correct posts array.
  window.deletePost = function(index) {
    posts.splice(index, 1);
    //savePosts();
    renderPosts();
  };
});

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

fetch('http://localhost:3000/api/get_opslagstavle').then(response => response.json())


