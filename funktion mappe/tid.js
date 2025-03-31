document.addEventListener("DOMContentLoaded", () => {
    const savedDatesDiv = document.getElementById("savedDates");
    const dateForm = document.getElementById("dateForm");
    const eventDateInput = document.getElementById("eventDate");

    let savedDates = JSON.parse(localStorage.getItem("savedDates")) || [];

    // Function to save a date
    function saveDate(date) {
        const formattedDate = new Date(date).toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
        savedDates.push(formattedDate);
        localStorage.setItem("savedDates", JSON.stringify(savedDates));
        renderSavedDates();
    }

    // Function to render saved dates
    function renderSavedDates() {
        savedDatesDiv.innerHTML = "";
        savedDates.forEach((date) => {
            const dateDiv = document.createElement("div");
            dateDiv.textContent = date;
            savedDatesDiv.appendChild(dateDiv);
        });
    }

    // Form submit event listener
    dateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        saveDate(eventDateInput.value);
        eventDateInput.value = ""; // Clear the input
    });

    // Load saved dates on page load
    renderSavedDates();
});

document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.getElementById("downloadDates");
    console.log("Download Button:", downloadButton); // Should log the button element or `null`
    if (downloadButton) {
        downloadButton.addEventListener("click", () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedDates, null, 2));
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "savedDates.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        });
    } else {
        console.error("Download button not found!");
    }
});