const path = require("path")
const fs = require("fs")
const remote = require('@electron/remote');
const {Menu, MenuItem} = remote;

const body = document.querySelector('body');

let selectedDate = null;
const date = new Date();

export function renderCalendar(date, selectedDate) {
    fs.readFile(path.resolve(__dirname, "tasks.json"), (err, data) => {

        let tasks = JSON.parse(data)

        const monthyear = document.querySelector("#monthyear");
        const days = document.querySelector("#calendar");
        const menu = document.getElementById("task-menu");

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
                daysHTML += `<div class="day today">${i}`;
            } else if (selected) {
                daysHTML += `<div class="day selected">${i}`;
            } else {
                daysHTML += `<div class="day current-month">${i}`;
            }

            for (let h = 0; h < tasks.length; h++) {
                let taskDate = new Date(tasks[h].date)
                if (compareDates(taskDate, currentDate)) {
                    daysHTML += `<div class="calendar-task">${tasks[h].name}</div>`
                }
            }

            daysHTML += `</div>`
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

            day.addEventListener('contextmenu', function (event) {
                event.preventDefault();

                const x = event.clientX + 2;
                const y = event.clientY;

                // Set the position for menu
                menu.style.top = `${y}px`;
                menu.style.left = `${x}px`;

                // Show the menu
                menu.classList.remove('hidden');
            });
        });

        setTimeout(function () {
            days.classList.remove("fade-enter-right");
            days.classList.remove("fade-enter-left");
            days.classList.remove("fade-enter-active");
            body.classList.remove('is-changing');
        }, 500);

    })
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

function compareDates(date1, date2) {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
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