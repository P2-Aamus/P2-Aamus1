document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById("calendar-grid");
    const weekNumberElement = document.getElementById("week-number");
    let currentWeek = 12;

    let currentLocation = "lokale1"; // Standard lokation
    let allBookings = {
        lokale1: [{ day: 1, time: 12, duration: 4, name: "Din tid", color: "blue" },
            { day: 3, time: 18, duration: 2, name: "Anders", color: "red" },
            { day: 4, time: 10, duration: 2, name: "Frank", color: "red" }],
        lokale2: [{ day: 3, time: 8, duration: 3, name: "Din tid", color: "blue" }],
        lokale3: [],
        lokale4: [],
        lokale5: [],
        lokale6: [],
        lokale7: [],
        lokale8: []
    };



    function prevWeek() {
        currentWeek--;
        updateWeek();
    }

    function nextWeek() {
        currentWeek++;
        updateWeek();
    }

    function updateWeek() {
        weekNumberElement.textContent = `UGE ${currentWeek}`;
        renderCalendar();
    }

    function renderCalendar() {
        calendarGrid.innerHTML = "";

        const days = ["Tid", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
        const hours = Array.from({ length: 15 }, (_, i) => i + 8);

        // Header (Ugedage)
        days.forEach(day => {
            const headerCell = document.createElement("div");
            headerCell.className = "calendar-cell time-label";
            headerCell.textContent = day;
            calendarGrid.appendChild(headerCell);
        });

        // Tidspunkter og celler
        for (let hour of hours) {
            // Tidskolonne
            const timeCell = document.createElement("div");
            timeCell.className = "calendar-cell time-label";
            timeCell.textContent = `${hour}:00`;
            calendarGrid.appendChild(timeCell);

            // Ugedagsceller
            for (let day = 0; day < 7; day++) {
                const cell = document.createElement("div");
                cell.className = "calendar-cell";
                
// Tilføj weekend-klasse til lørdag og søndag
if (day === 5 || day === 6) {
    cell.classList.add("weekend");
}

cell.onclick = () => openModal(day, hour);


                // Check om der er en booking på dette tidspunkt
                const booking = allBookings.lokale1.find(b => b.day === day && b.time === hour);
                if (booking) {
                    const bookingDiv = document.createElement("div");
                    bookingDiv.className = `booking ${booking.color}`;
                    bookingDiv.innerHTML = `${booking.name}<br>${hour}:00 - ${hour + booking.duration}:00`;
                
                    // Juster højden baseret på varigheden
                    bookingDiv.style.height = `${48 * booking.duration}px`;
                    
                    cell.appendChild(bookingDiv);
                }
                

                calendarGrid.appendChild(cell);
            }
        }
    }

    document.querySelector("button[onclick='prevWeek()']").addEventListener("click", prevWeek);
    document.querySelector("button[onclick='nextWeek()']").addEventListener("click", nextWeek);

    updateWeek();
});

//Change room
let roomSelect = document.getElementById("location-select");

function RoomChange() {
    console.log("heeeeej");
    

}