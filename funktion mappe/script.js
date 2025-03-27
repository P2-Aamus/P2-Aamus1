document.addEventListener("DOMContentLoaded", () => {
    const noticeBoardButton = document.getElementById("noticeBoardButton");

    function openNoticeBoard() {
        let postsElement = document.getElementById('posts');
        let messageBoardElement = document.getElementById('messageBoard');
        
        /*
        if (postsElement) {
            postsElement.style.visibility = 'hidden';
        }
        if (messageBoardElement) {
            messageBoardElement.style.visibility = 'hidden';
        }
            */
        console.log("Notice board opened!"); // Example code
        //More code.
    }


    noticeBoardButton.addEventListener("click", openNoticeBoard);
});