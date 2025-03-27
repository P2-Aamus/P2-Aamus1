let currentLocation = "lokale1"; // Standard lokation
let bookingDiv;




document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById("calendar-grid");
    const weekNumberElement = document.getElementById("week-number");
    let currentWeek = 12;
    


    //Change room
    //window.RoomChange is written this way, so that the global scope can access it
    window.RoomChange = function (){
        let select = document.getElementById('location-select'); 
        let value = select.options[select.selectedIndex].value; 
        currentLocation = value;
        renderCalendar();
        }
   
    let allBookings12 = {
        lokale1: [{ day: 1, time: 12, duration: 3, name: "Din tid", color: "blue", bankPå: true},
            { day: 3, time: 18, duration: 2, name: "Anders", color: "red", bankPå: false},
            { day: 4, time: 10, duration: 2, name: "Frank", color: "red", bankPå: true }],
        lokale2: [{ day: 3, time: 8, duration: 3, name: "Din tid", color: "blue" }],
        lokale3: [],
        lokale4: [],
        lokale5: [],
        lokale6: [],
        lokale7: [],
        lokale8: []
    };

    let allBookings13 = {
        lokale1: [{ day: 3, time: 10, duration: 2, name: "Din tid", color: "blue", bankPå: true},
            { day: 6, time: 9, duration: 5, name: "Anders", color: "red", bankPå: false},
            { day: 1, time: 16, duration: 3, name: "Frank", color: "red", bankPå: true }],
        lokale2: [{ day: 2, time: 8, duration: 4, name: "Din tid", color: "blue" }],
        lokale3: [],
        lokale4: [],
        lokale5: [],
        lokale6: [],   
        lokale7: [],
        lokale8: []
    };


    let currentBookings = allBookings12[currentLocation];

    window.prevWeek = function () {
        if (currentWeek > 1) { // Tjek for at undgå under 1
            currentWeek--;
            updateWeek();
        }
    }
    
    window.nextWeek = function () {
        if (currentWeek < 52) { // Tjek for at undgå over 52
            currentWeek++;
            updateWeek();
        }
    }

    function updateWeek() {
        weekNumberElement.textContent = `UGE ${currentWeek}`;
        renderCalendar();
    }

    window.renderCalendar = function () {
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
                //cell.onclick = () => openModal(day, hour); // Gør cellen klikbar
    
                // Hent bookinger for den aktuelle lokation
                if(currentWeek == 12) {
                 currentBookings = allBookings12[currentLocation];
                }
                else if(currentWeek == 13) {
                     currentBookings = allBookings13[currentLocation];
                }
                let booking = currentBookings.find(b => b.day === day && b.time === hour);
    
                if (booking) {
                    bookingDiv = document.createElement("div");
                    bookingDiv.className = `booking ${booking.color}`;
                    bookingDiv.innerHTML = `${booking.name}<br>${hour}:00 - ${hour + booking.duration}:00`;
                    //bookingDiv.addEventListener('click', document.getElementById("popup")?.style.display = "none");
                    // Juster højden baseret på varigheden
                    bookingDiv.style.height = `${48 * booking.duration}px`;
                    
                    cell.appendChild(bookingDiv);
                }
                                         
                calendarGrid.appendChild(cell);
            }
        }
    }
    



    updateWeek();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = bookingDiv;

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
});