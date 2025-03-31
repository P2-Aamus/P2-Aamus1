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

function load() {
  const dt = new Date();
 

  const day = dt.getDate();
  const weekday = dt.getDay();
  const month = dt.getMonth();
  const year = dt.getFullYear();


  for (let i = 0; i < 7; i++) {
    weekDiv = document.createElement('div');
    weekDiv.innerHTML = `${weekdays[0+i]} ${calculateDate(i)}`;
    weekdayElement?.appendChild(weekDiv);
  }

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('da-dk', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `Uge ${getWeekNumber() + nav}`;

  
    calendar.innerHTML = '';



  for(let i = 1; i < 169; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = '';
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day -1 && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
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
    load();
    
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
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

function calculateDate(i){
  let currentDate = new Date().getDate;
  let currentMonth = new Date().getMonth;
  let currentYear = new Date().getFullYear;
  
  let daysInMonth = 31;

  if (currentDate <= daysInMonth) { 
    return `${currentDate} ${currentMonth}`;
  } else {
    currentDate = 1;
    currentMonth++;
    return `${currentDate } ${currentMonth + 1}`;  
    }
}