document.addEventListener("DOMContentLoaded", () => {
    const dateTimeForm = document.getElementById("dateTimeForm");
    const eventDateInput = document.getElementById("eventDate");
    const eventTimeInput = document.getElementById("eventTime");
    const bankPåInput = document.getElementById("bankPå");
    const bookingsContainer = document.getElementById("bookingsContainer");
    const formTitle = document.createElement("h3"); // Add a title to indicate edit mode
    formTitle.textContent = "Tilføj tid";
    dateTimeForm.prepend(formTitle);

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let editingIndex = null; // Track the index of the booking being edited

    // Function to save bookings to localStorage
    function saveBookings() {
        localStorage.setItem("bookings", JSON.stringify(bookings));
    }

    // Function to render bookings
    function renderBookings() {
        bookingsContainer.innerHTML = "";
        bookings.forEach((booking, index) => {
            const bookingDiv = document.createElement("div");
            bookingDiv.classList.add("booking");
            bookingDiv.innerHTML = `
                <p><strong>Dato:</strong> ${booking.date}</p>
                <p><strong>Tid:</strong> ${booking.time}</p>
                <p><strong>Bank på:</strong> ${booking.bankPå ? "Ja" : "Nej"}</p>
                <button class="rediger-booking" data-index="${index}">Redigér</button>
                <button class="slet-booking" data-index="${index}">Slet</button>
            `;
            bookingsContainer.appendChild(bookingDiv);
        });
    }

    // Function to add or update a booking
    function addOrUpdateBooking(date, time, bankPå) {
        if (editingIndex !== null) {
            // Update the existing booking
            bookings[editingIndex] = { date, time, bankPå };
            editingIndex = null; // Reset editing index
            formTitle.textContent = "Tilføj tid"; // Reset form title
            dateTimeForm.classList.remove("edit-mode"); // Remove edit mode styling
        } else {
            // Add a new booking
            bookings.push({ date, time, bankPå });
        }
        saveBookings();
        renderBookings();
    }

    // Function to delete a booking
    function deleteBooking(index) {
        bookings.splice(index, 1);
        saveBookings();
        renderBookings();
    }

    // Function to edit a booking
    function editBooking(index) {
        const booking = bookings[index];
        eventDateInput.value = booking.date;
        eventTimeInput.value = booking.time;
        bankPåInput.checked = booking.bankPå;
        editingIndex = index; // Set the index of the booking being edited
        formTitle.textContent = "Rediger tid"; // Update form title
        dateTimeForm.classList.add("edit-mode"); // Add edit mode styling
    }

    // Form submit event listener
    dateTimeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const date = eventDateInput.value;
        const time = eventTimeInput.value;
        const bankPå = bankPåInput.checked;
        addOrUpdateBooking(date, time, bankPå);
        eventDateInput.value = "";
        eventTimeInput.value = "";
        bankPåInput.checked = false;
    });

    // Event delegation for edit and delete buttons
    bookingsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("slet-booking")) {
            const index = event.target.getAttribute("data-index");
            deleteBooking(index);
        } else if (event.target.classList.contains("rediger-booking")) {
            const index = event.target.getAttribute("data-index");
            editBooking(index);
        }
    });

    // Load bookings on page load
    renderBookings();
});