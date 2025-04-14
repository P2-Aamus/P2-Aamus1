document.addEventListener("DOMContentLoaded", () => {
    const nameForm = document.getElementById("eventName");
    const dateTimeForm = document.getElementById("dateTimeForm1");
    const eventDateInput = document.getElementById("eventDate");
    const eventTimeInput = document.getElementById("eventTime");
    const endTimeInput = document.getElementById("endTime");
    const tlf_nrInput = document.getElementById("eventTlfNr");
    const bankPåInput = document.getElementById("bankPå");
    const bookingsContainer = document.getElementById("bookingsContainer");
    const eventSelectInput = document.getElementById("eventSelect");
    const formTitle = document.createElement("h3"); // Add a title to indicate edit mode
    let chosenLokale = "events1"; // Default value for chosenLokale
    formTitle.textContent = "Tilføj tid";
    dateTimeForm.prepend(formTitle);

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let editingIndex = null; // Track the index of the booking being edited

    eventSelectInput.addEventListener("change", (event) => {
        chosenLokale = event.target.value;
        renderBookings();
    });



        // Form submit event listener
        dateTimeForm?.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = nameForm.value;
            const tlf_nr = tlf_nrInput.value;
            const endTime = endTimeInput.value;
            const date = eventDateInput.value;
            const time = eventTimeInput.value;
            const bankPå = bankPåInput.checked;
            saveBookings();
            //addOrUpdateBooking(date, time, bankPå);
            load();
            name.value = "";
            tlf_nrInput.value = "";
            endTimeInput.value = "";
            eventDateInput.value = "";
            eventTimeInput.value = "";
            bankPåInput.checked = false;
            renderBookings();
        });


    // Function to save bookings to localStorage
    function saveBookings() {        

        fetch(`http://localhost:3000/api/${chosenLokale}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: nameForm.value,
              event_date: eventDateInput.value,
              start_time: eventTimeInput.value,
              end_time: endTimeInput.value,
              tlf_nr: tlf_nrInput.value,
              bank_pa: bankPåInput.checked,
              description: ""
            })
          })
          .then(response => response.json())
          .then(data => console.log('Success:', data))
          .catch(error => console.error('Error:', error));
          
    }

    // Function to render bookings
    async function renderBookings() {
        bookingsContainer.innerHTML = "";

        let responseRaw= await fetch(`http://localhost:3000/api/get_${chosenLokale}`);
        let response = await responseRaw.json();

        console.log(response);

        for (let booking of response) {
            if (booking.title === "Antonio") {
            const bookingDiv = document.createElement("div");
            bookingDiv.classList.add("booking");
            bookingDiv.innerHTML = `
                <p><strong>Navn:</strong> ${booking.title}</p>
                <p><strong>Dato:</strong> ${new Date(booking.event_date).toLocaleDateString()}</p>
                <p><strong>Kl:</strong> ${booking.start_time} til ${booking.end_time}</p>
                <p><strong>Tlf Nr:</strong> ${booking.tlf_nr}</p>
                <p><strong>Bank på:</strong> ${booking.bank_pa ? "Ja" : "Nej"}</p>
                <button class="rediger-booking" data-index="${booking}">Redigér</button>
                <button class="slet-booking" data-index="${booking}">Slet</button>
            `;
            bookingsContainer.appendChild(bookingDiv);
        }}
        
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