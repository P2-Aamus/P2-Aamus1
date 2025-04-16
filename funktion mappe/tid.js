//tid.js styrer bestillinger, og den viser dine bestillinger

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
    const formTitle = document.createElement("h3");
    let chosenLokale = "events1";
    formTitle.textContent = "Tilføj tid";
    dateTimeForm.prepend(formTitle);


    //fixed times init
    let fixedTimeForm = document.getElementById("fixedTimeForm");
    let eventNameFixedInput = document.getElementById("eventNameFixed");
    let tlfNrFixedInput = document.getElementById("tlfNrFixed");
    let fixedTimeDayDropdown = document.getElementById("fixedTimeDay");
    let startTimeFixedInput = document.getElementById("startTimeFixed");
    let endTimeFixedInput = document.getElementById("endTimeFixed");
    let bankPåFixedInput = document.getElementById("bankPåFixed");
    




    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let editingIndex = null;

    //viser bookings for den valgte lokale
    eventSelectInput.addEventListener("change", (event) => {
        chosenLokale = event.target.value;
        renderBookings();
    });



        // Form submit event listener
        dateTimeForm?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = nameForm.value;
            const tlf_nr = tlf_nrInput.value;
            const endTime = endTimeInput.value;
            const date = eventDateInput.value;
            const time = eventTimeInput.value;
            const bankPå = bankPåInput.checked;

            try {
                // Fetch existing bookings
                let responseRaw = await fetch(`http://localhost:3000/api/get_${chosenLokale}`);
                if (!responseRaw.ok) {
                    console.error("Failed to fetch bookings:", responseRaw.statusText);
                    alert("Error fetching bookings. Please try again.");
                    return;
                }

                let response = await responseRaw.json();

                //Tjekker om der er andre bookinger på samme tid
                for (let booking of response) {

                    const inputDate = new Date(date).toISOString().split('T')[0]; 
                    let bookingDateObj = new Date(booking.event_date);

                    // Shift bookingDate by one day
                    bookingDateObj.setDate(bookingDateObj.getDate() + 1);

                    const bookingDate = bookingDateObj.toISOString().split('T')[0];

                    const toMinutes = t => {
                        const [h, m] = t.split(':').map(Number);
                        return h;
                    };
                    
                    const inputTimeMin = toMinutes(time);
                    const bookingStartMin = toMinutes(booking.start_time);
                    const bookingEndMin = toMinutes(booking.end_time);
                    
                    if (bookingDate === inputDate && inputTimeMin >= bookingStartMin && inputTimeMin < bookingEndMin) {
                        alert("Booking time conflicts with an existing booking!");
                        return;
                    }
                }
                
                //hvis der ikke er konflikter, så kan man gemme den nye booking
                await saveBookings();
                load();

                // Reset form fields
                nameForm.value = "";
                tlf_nrInput.value = "";
                endTimeInput.value = "";
                eventDateInput.value = "";
                eventTimeInput.value = "";
                bankPåInput.checked = false;

                // Re-render bookings
                renderBookings();
            } catch (error) {
                console.error("Error during booking submission:", error);
                alert("An error occurred. Please try again.");
            }
        });


    //Funktionen gemmer en ny booking i databasen
    async function saveBookings() {        

        await fetch(`http://localhost:3000/api/${chosenLokale}`, {
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
          .then(load)
          .catch(error => console.error('Error:', error));
          
    }

    // Funktion til at render bookings
    async function renderBookings() {
        bookingsContainer.innerHTML = "";

        let responseRaw= await fetch(`http://localhost:3000/api/get_${chosenLokale}`);
        let response = await responseRaw.json();


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
                <button class="slet-booking" data-post-id="${booking.id}">Slet</button>
            `;
            bookingsContainer.appendChild(bookingDiv);
        }}
    }


    //Sletter bookings
    bookingsContainer?.addEventListener("click", (event) => {
        if (event.target.classList.contains("slet-booking")) {
            const index = event.target.getAttribute("data-post-id");
            deleteBooking(index);
        } 
    });

    
    //Faste tider

    fixedTimeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = eventNameFixedInput.value;
        const startTime = startTimeFixedInput.value;
        const endTime = endTimeFixedInput.value;
        const bankPå = bankPåFixedInput.checked;
        const day = fixedTimeDayDropdown.value;
        
        saveFixedTimeBooking();
        fixedTimeForm.reset();
    });

    //Gemmer de faste tider
    async function saveFixedTimeBooking() {
        await fetch(`http://localhost:3000/api/faste_tider`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: eventNameFixedInput.value,
              lokale: chosenLokale,
              tlf_nr: tlfNrFixedInput.value,
              day: fixedTimeDayDropdown.value,
              start_time: startTimeFixedInput.value,
              end_time: endTimeFixedInput.value,
              bank_pa: bankPåFixedInput.checked
            })
          })
          .then(response => response.json())
          .then(load)
          .catch(error => console.error('Error:', error));
    }


    renderBookings();

    //sletter booking med deres ID
    async function deleteBooking(bookingId) {
        try {
            const response = await fetch(`http://localhost:3000/api/${chosenLokale}/${bookingId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log(`Booking with ID ${bookingId} deleted successfully`);
                renderBookings();
                load();
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
});