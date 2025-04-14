let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdayElement = document.getElementById('weekdays');
let weekDiv = null;
const weekdays = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const eventSelectInput = document.getElementById("eventSelect");

const nameForm = document.getElementById("eventName");
const dateTimeForm = document.getElementById("dateTimeForm2");
const eventDateInput = document.getElementById("eventDate2");
const eventTimeInput = document.getElementById("eventTime2");
const endTimeInput = document.getElementById("endTime2");
const tlf_nrInput = document.getElementById("eventTlfNr2");
const bankPåInput = document.getElementById("bankPå2");

let chosenLokale = 'events1'; // Default value for chosenLokale
let selectedWeek = getWeekNumber();



eventSelectInput.addEventListener("change", (event) => {
 chosenLokale = event.target.value;
 load();

});

dateTimeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameForm.value;
  const tlf_nr = tlf_nrInput.value;
  const endTime = endTimeInput.value;
  const date = eventDateInput.value;
  const time = eventTimeInput.value;
  const bankPå = bankPåInput.checked;
  //addOrUpdateBooking(date, time, bankPå);
  saveBookings();
  name.value = "";
  tlf_nrInput.value = "";
  endTimeInput.value = "";
  eventDateInput.value = "";
  eventTimeInput.value = "";
  bankPåInput.checked = false;
  closeModal();
});


function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

async function load() {

  let responseRaw= await fetch(`http://localhost:3000/api/get_${chosenLokale}`);
  let response = await responseRaw.json();


  getNext7Days();
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }
 
  const hour = new Date().getHours(); // e.g., 14
  const day = dt.getDate();
  const dayOfWeek = dt.getDay();
  const weekday = dt.getDay();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  



  document.getElementById('monthDisplay').innerText = 
    `Uge ${selectedWeek + nav}`;

  
    calendar.innerHTML = '';


  for(let i = 1; i <= 168; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

  
      if (i === (dayOfWeek) * (7 * hour+1) && nav === 0) {
        daySquare.id = 'currentDay';
      }
      
      daySquare.addEventListener('click', () => openModal(i));

    calendar.appendChild(daySquare);  
    
    //Populate calendar with events
    for (let events of response) {
      let date = new Date(events.event_date);
      let dayOfWeek = date.getDay();
      let eventBlock = (dayOfWeek -2 ) + (7 * parseInt(events.start_time.split(':')[0]) + 1);
      let eventEndBlock = (dayOfWeek - 2) + (7 * parseInt(events.end_time.split(':')[0]) - 6);

      //calculate week of event
      // Calculate the ISO week number for the event date
      const tempDate = new Date(events.event_date);
      tempDate.setHours(0, 0, 0, 0);
      tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7)); // Adjust to Thursday
      const week1 = new Date(tempDate.getFullYear(), 0, 4);
      week1.setDate(week1.getDate() - ((week1.getDay() + 3) % 7));
      const eventWeekNumber = 1 + Math.round(((tempDate - week1) / 86400000 - 3) / 7);

      //console.log(eventBlock);
      for (let hour = parseInt(events.start_time.split(':')[0]); hour < parseInt(events.end_time.split(':')[0]); hour++) {
        const eventSlot = (hour * 7) + (dayOfWeek - 1) + 1; // Column shift: Mon = 0 → +1 aligns with i
      
        if (i === eventSlot && eventWeekNumber === selectedWeek + nav) {
          const eventDiv = document.createElement('div');
          eventDiv.innerText = events.title;
          eventDiv.classList.add('event');
          daySquare.appendChild(eventDiv);

          if (events.title !== "Antonio") {
            eventDiv.style.backgroundColor = "red";
          }
        }
      }
    }
  }

  
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    selectedWeek + nav;
    load();
    
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    selectedWeek + nav;
    load();
  });

  document.getElementById('todayButton').addEventListener('click', () => {
    nav = 0;
    selectedWeek = getWeekNumber();
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();

function getWeekNumber() {
  let date = new Date();
  // Torsdag i denne uge
  date.setHours(0, 0, 0, 0); // tal nulstiller timer og sekunder
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7)); 
  
  // 1. januar
  let week1 = new Date(date.getFullYear(), 0, 4);
  
  // Torsdag i uge 1
  week1.setDate(week1.getDate() - ((week1.getDay() + 3) % 7));
  
  // Beregn uge nummer
  let weekNumber = 1 + Math.round(((date - week1) / 86400000 - 3) / 7);
  return weekNumber;
}

function getNext7Days() {
  // Clear previous content
  weekdayElement.innerHTML = '';

  const next7Days = [];
  const today = new Date();
  
  // Adjust for navigation (nav represents week shifts)
  today.setDate(today.getDate() + nav * 7);

  for (let i = -1; i < 6; i++) {
    let futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);

    const day = futureDate.getDate();
    const month = futureDate.getMonth() + 1; // Months are 0-based
    const year = futureDate.getFullYear();
    
    let finalFutureDate = `${day}/${month}/${year}`;
    let currentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    
    weekDiv = document.createElement('div');
    weekDiv.innerHTML = `${weekdays[i+1]} ${day+1}/${month}`;
    
 //doesn't work yet
    if (finalFutureDate === currentDate) {
      weekDiv.className = "current-Weekday"
      //console.log("today", today);
    }
    weekdayElement.appendChild(weekDiv);
  }
  
  }


  //if (currentDate <= daysInMonth) { 
    //return `${currentDate} ${currentMonth}`;
  //} else {
    //currentDate = 1;
    //currentMonth++;
    //return `${currentDate } ${currentMonth + 1}`;  
    //}


window.addEventListener("DOMContentLoaded", () => {
  const scrollable = document.querySelector(".scrollable-section");

  // Scroll til midten
  scrollable.scrollTop = scrollable.scrollHeight / 3;
});