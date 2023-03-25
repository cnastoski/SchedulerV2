const body = document.querySelector('body');

let selectedDate = null;
const date = new Date();



export function renderCalendar(date, selectedDate) {
    const monthyear = document.querySelector("#monthyear");
    const days = document.querySelector("#calendar");

    renderWeekdays();
 
    const year = date.getFullYear();
    const month = date.getMonth();

    monthyear.innerHTML = `${months[month]} ${year}`;

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let firstDayOfMonth = new Date(year, month, 1).getDay();

    let daysFromPrevMonth = firstDayOfMonth;
    let daysFromNextMonth = 0;

    daysFromNextMonth = 42 - (daysInMonth + daysFromPrevMonth);

    let daysHTML = '';

    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
        const prevDate = new Date(year, month, -i);
        daysHTML += `<div class="day prev-month">${prevDate.getDate()}</div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        const today = isToday(currentDate);
        const selected = isSelected(currentDate);
    
        if (today) {
          daysHTML += `<div class="day today">${i}</div>`;
        } 
        else if (selected) {
          daysHTML += `<div class="day selected">${i}</div>`;
        } 
        else {
          daysHTML += `<div class="day current-month">${i}</div>`;
        }
    }

    for (let i = 1; i <= daysFromNextMonth; i++) {
        const nextDate = new Date(year, month + 1, i);
        daysHTML += `<div class="day next-month">${nextDate.getDate()}</div>`;
    }

    days.innerHTML = daysHTML;

    const allDays = days.querySelectorAll('div');

    allDays.forEach((day) => {
        day.addEventListener('click', () => {
          const dayNum = parseInt(day.innerHTML);
    
          if (isNaN(dayNum)) {
            return;
          }
    
          if (selectedDate != null) {
            selectedDate.classList.remove('selected');
          }
    
          day.classList.add('selected');
          selectedDate = day;
        });
      });

      setTimeout(function () {
        days.classList.remove("fade-enter-right");
        days.classList.remove("fade-enter-left");
        days.classList.remove("fade-enter-active");
      }, 500);

      body.classList.remove('is-changing');
}


export function prevMonthHandler(){
    const month = date.getMonth();
  
    if (month === 0) {
      date.setFullYear(date.getFullYear() - 1);
      date.setMonth(11);
    } else {
      date.setMonth(month - 1);
    }
  
    renderCalendar(date);

    const days = document.querySelector("#calendar");
    days.classList.add("fade-enter-left");
    days.classList.add("fade-enter-active");
    body.classList.add('is-changing');

}

export function nextMonthHandler(){
    const month = date.getMonth();
    
    if (month === 11) {
        date.setFullYear(date.getFullYear() + 1);
        date.setMonth(0);
    } else {
        date.setMonth(month + 1);
    }
    
    renderCalendar(date);

    const days = document.querySelector("#calendar");
    days.classList.add("fade-enter-right");
    days.classList.add("fade-enter-active");
    body.classList.add('is-changing');

}

function renderWeekdays(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekdaydiv = document.querySelector("#daynames")

    let weekdayhtml = ''
    for (let i in weekday){
        weekdayhtml += `<div class="weekday">${weekday[i]}</div>`
    }

    weekdaydiv.innerHTML = weekdayhtml;
}

function isToday(date) {
    const today = new Date();
  
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
      );

}


export function isSelected(date, selectedDate) {
    if (selectedDate == null) {
    return false;
    }
    
    const selectedDay = parseInt(selectedDate.innerHTML);
    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();
    
    return (
    selectedDay === date.getDate() &&
    selectedMonth === date.getMonth() &&
    selectedYear === date.getFullYear()
    );
}


const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];