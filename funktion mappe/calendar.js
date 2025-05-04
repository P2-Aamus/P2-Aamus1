//log Out button
const logoutButton = document.getElementById("LogoutBtn");

logoutButton?.addEventListener("click", () => {
  window.location.href = '/login.html';
});

//Initialize variabler og HTML-elementer
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

let chosenLokale = ''; 
let selectedWeek = getWeekNumber();


//Skifter hvilket lokale vises på siden
eventSelectInput.addEventListener("change", (event) => {
 chosenLokale = event.target.value;
 load();

});

//viser en pop up med info omkring den valgte booking, ved at læse dem fra databasen
async function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {

    let responseRaw = await fetch(`http://localhost:3000/api/get_${chosenLokale}`);
    let response = await responseRaw.json();

    let responseRaw_fixedTimes = await fetch(`http://localhost:3000/api/get_faste_tider`);
    let response_fixedTimes = await responseRaw_fixedTimes.json();

    //Kalendaren er rendered som en linje, som er "foldet" i en firkant, og eventSlot beregner hvilken firkant, en booking hører til
    for (let events of response) {
      let date = new Date(events.event_date);
      let dayOfWeek = date.getDay();
      let hour = parseInt(events.start_time.split(':')[0])
      let eventSlot = (hour * 7) + (dayOfWeek - 1) + 1;

      if (clicked === eventSlot) {
        document.getElementById('eventText').innerText = events.title;
        document.getElementById('eventTimeModal').innerText = "Fra " + events.start_time + " til " + events.end_time;
        document.getElementById('tlfNrModal').innerText = "Tlf Nr. " + events.tlf_nr;

        if (events.bank_pa) {
        document.getElementById('bankPåModal').innerText = "Bank på: Ja";
        } else {
          document.getElementById('bankPåModal').innerText = "Bank på: Nej";
        }
        deleteEventModal.style.display = 'block';
        backDrop.style.display = 'block';
      } //Det samme sker for faste tider
      else for (let events of response_fixedTimes) {
      let dayOfWeek = events.day;
      let hour = parseInt(events.start_time.split(':')[0])
      let eventSlot = (hour * 7) + (dayOfWeek - 1) + 1;

      if (clicked === eventSlot) {
        document.getElementById('eventText').innerText = events.title;
        document.getElementById('eventTimeModal').innerText = "Fra " + events.start_time + " til " + events.end_time;
        document.getElementById('tlfNrModal').innerText = "Tlf Nr. " + events.tlf_nr;

        if (events.bank_pa) {
          document.getElementById('bankPåModal').innerText = "Bank på: Ja";
        } else {
            document.getElementById('bankPåModal').innerText = "Bank på: Nej";
          }

        deleteEventModal.style.display = 'block';
        backDrop.style.display = 'block';
      }
    }
  }
}
}

//Funktionen loader alle events fra serveren og renderer dem på kalenderen, samt loade selve kalenderen
async function load() {

  hideLokaleOptions();

  let responseRaw = await fetch(`http://localhost:3000/api/get_${chosenLokale}`);
  let response = await responseRaw.json();


  let responseRaw_fixedTimes = await fetch(`http://localhost:3000/api/get_faste_tider`);
  let response_fixedTimes = await responseRaw_fixedTimes.json();

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

  //const firstDayOfMonth = new Date(year, month, 1);
  //const daysInMonth = new Date(year, month + 1, 0).getDate();
  



  document.getElementById('monthDisplay').innerText = 
    `Uge ${selectedWeek + nav}`;

  
    calendar.innerHTML = '';

  //for hver time i en uge, load en firkant
  for(let i = 1; i <= 168; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

  
      if (i === (dayOfWeek) + (7 * hour) && nav === 0) {
        daySquare.id = 'currentDay';
      }
      
      daySquare.addEventListener('click', () => openModal(i));

    calendar.appendChild(daySquare);  
    
    //Indsætter bookings i kalendaren fra databasen
    for (let events of response) {
      let date = new Date(events.event_date);
      let dayOfWeek = date.getDay();

      //Beregner hvilken uge, en booking er i
      const tempDate = new Date(events.event_date);
      tempDate.setHours(0, 0, 0, 0);
      tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
      const week1 = new Date(tempDate.getFullYear(), 0, 4);
      week1.setDate(week1.getDate() - ((week1.getDay() + 3) % 7));
      const eventWeekNumber = 1 + Math.round(((tempDate - week1) / 86400000 - 3) / 7);

      //hvis en booking varer flere timer, indsætter den i kalendaren flere gange
      for (let hour = parseInt(events.start_time.split(':')[0]); hour < parseInt(events.end_time.split(':')[0]); hour++) {
        const eventSlot = (hour * 7) + (dayOfWeek - 1) + 1;
      
        if (i === eventSlot && eventWeekNumber === selectedWeek + nav) {
          const eventDiv = document.createElement('div');
          eventDiv.innerText = events.title;
          eventDiv.classList.add('event');
          daySquare.appendChild(eventDiv);

          //Hvis en booking ikke er Antonios, så skal farven være rødt, sådan at man kan nemt skelne mellem egne og andres tider
          if (events.title !== "Antonio") {
            eventDiv.style.backgroundColor = "red";
          }
        }
      }
    }    

    //Indsætter faste i kalendaren fra databasen (samme logik som før)
    for (let events of response_fixedTimes) {
      let day = events.day;
      let dayOfWeek = 0;


      for (let hour = parseInt(events.start_time.split(':')[0]); hour < parseInt(events.end_time.split(':')[0]); hour++) {
        const eventSlot = (hour * 7) + (day - 1) + 1;
      
        if (i === eventSlot && events.lokale === chosenLokale) {
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
//lukker pop up
function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

//initialize knapperne til at gå frem og tilbage i ugerne
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

  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();

//beregner den aktuelle uge
function getWeekNumber() {
  let date = new Date();
  date.setHours(0, 0, 0, 0); // tal nulstiller timer og sekunder
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7)); 
  
  // 1. januar
  let week1 = new Date(date.getFullYear(), 0, 4);
  
  week1.setDate(week1.getDate() - ((week1.getDay() + 3) % 7));
  
  // Beregn uge nummer
  let weekNumber = 1 + Math.round(((date - week1) / 86400000 - 3) / 7);
  return weekNumber;
}

//berenger dagene i ugen
function getNext7Days() {
  // Clear previous content
  weekdayElement.innerHTML = '';

  const next7Days = [];
  const today = new Date();
  
  // Adjust for navigation (nav represents week shifts)
  today.setDate(today.getDate() + nav * 7);

  for (let i = -1; i < 6; i++) {
    let futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i -1);

    const day = futureDate.getDate();
    const month = futureDate.getMonth() + 1; // Months are 0-based
    const year = futureDate.getFullYear();
    
    let finalFutureDate = `${day}/${month}/${year}`;
    let currentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    
    weekDiv = document.createElement('div');
    weekDiv.innerHTML = `${weekdays[i+1]} ${day}/${month}`;
    
    weekdayElement.appendChild(weekDiv);
  }
  
}

window.addEventListener("DOMContentLoaded", () => {
  const scrollable = document.querySelector(".scrollable-section");

  // Scroll til midten
  scrollable.scrollTop = scrollable.scrollHeight / 3;
});

//skjuler hvilke lokaler man kan tilgå efter hvem er logget på
function hideLokaleOptions(){
  if (localStorage.getItem("firstLoad") === "false") {
  if (localStorage.getItem("lokale1") === "true") {
    chosenLokale = "events1";
  } else {
    eventSelectInput.querySelector('option[value="events1"]').hidden = true;
  }

  if (localStorage.getItem("lokale2") === "true") {
    chosenLokale = "events2";
  } else {
    eventSelectInput.querySelector('option[value="events2"]').hidden = true;
  }

  if (localStorage.getItem("lokale3") === "true") {
    chosenLokale = "events3";
  } else {
    eventSelectInput.querySelector('option[value="events3"]').hidden = true;
  }

  if (localStorage.getItem("lokale4") === "true") {
    chosenLokale = "events4";
  } else {
    eventSelectInput.querySelector('option[value="events4"]').hidden = true;
  }

  if (localStorage.getItem("lokale5") === "true") {
    chosenLokale = "events5";
  } else {
    eventSelectInput.querySelector('option[value="events5"]').hidden = true;
  }

  if (localStorage.getItem("lokale6") === "true") {
    chosenLokale = "events6";
  } else {
    eventSelectInput.querySelector('option[value="events6"]').hidden = true;
  }

  if (localStorage.getItem("lokale7") === "true") {
    chosenLokale = "events7";
  } else {
    eventSelectInput.querySelector('option[value="events7"]').hidden = true;
  }

  if (localStorage.getItem("lokale8") === "true") {
    chosenLokale = "events8";
  } else {
    eventSelectInput.querySelector('option[value="events8"]').hidden = true;
  }
}
eventSelectInput.value = chosenLokale;
  localStorage.setItem("firstLoad", "true");
}

//admin button
const adminDivElement = document.getElementById("adminDiv");


if (localStorage.getItem("admin") == "true") {
  const adminButton = document.createElement("button");
  adminButton.innerText = "Admin";
  adminButton.addEventListener("click", () => {
    window.location.href = '/admin.html';
  });

  adminDivElement?.appendChild(adminButton);
}