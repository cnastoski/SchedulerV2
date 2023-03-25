
let selectedDate = null;

export function renderCalendar() {
    const monthyear = document.querySelector("#monthyear");
    const days = document.querySelector("#calendar");


    renderWeekdays();
 
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();

    monthyear.innerHTML = `${months[month]} ${year}`;

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let firstDayOfMonth = new Date(year, month, 1).getDay();

    let daysFromPrevMonth = firstDayOfMonth;
    let daysFromNextMonth = 0;

    if(daysInMonth + daysFromPrevMonth > 35){
        daysFromNextMonth = 42 - (daysInMonth + daysFromPrevMonth);
    }
    else if (daysInMonth + daysFromPrevMonth < 35){
        daysFromNextMonth = 35 - (daysInMonth + daysFromPrevMonth);
    }

    if (firstDayOfMonth === 0){
        daysFromPrevMonth = 7;
    }

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
          daysHTML += `<div class="day">${i}</div>`;
        }
    }

    for (let i = 1; i <= daysFromNextMonth; i++) {
        const nextDate = new Date(year, month + 1, i);
        daysHTML += `<div class="day next-month">${nextDate.getDate()}</div>`;
    }

    days.innerHTML = daysHTML;

}

export function renderWeekdays(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekdaydiv = document.querySelector("#daynames")

    for (let i in weekday){
        weekdaydiv.insertAdjacentHTML("beforeend", `<div class="weekday">${weekday[i]}</div>`)
    }

}

function isToday(date) {
    const today = new Date();
  
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
      );

}


function isSelected(date) {
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