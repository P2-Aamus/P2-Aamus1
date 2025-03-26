document.addEventListener("DOMContentLoaded", () => {
    const messageBoard = document.getElementById("messageBoard");
    const postForm = document.getElementById("postForm");
    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Function to add a post
    function addPost(title, content) {
        posts.push({ title, content });
        savePosts();
        renderPosts();
    }

    // Function to delete a post
    function deletePost(index) {
        posts.splice(index, 1);
        savePosts();
        renderPosts();
    }

    // Function to save posts to local storage
    function savePosts() {
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    // Function to render posts on the message board
    function renderPosts() {
        messageBoard.innerHTML = "";
        posts.forEach((post, index) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("notice");
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p1>${post.content}</p1>
                <button class="delete-btn" onclick="window.deletePost(${index})">Slet</button>
            `;
            messageBoard.appendChild(postDiv);
        });
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
        savePosts();
        renderPosts();
    };
});