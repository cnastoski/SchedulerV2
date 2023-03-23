export function renderCalendar() {
    renderDays();
    renderWeekdays();
}

export function renderWeekdays(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekdaydiv = document.querySelector("#daynames")

    for (let i in weekday){
        weekdaydiv.insertAdjacentHTML("beforeend", `<div class="weekday">${weekday[i]}</div>`)
    }

}

export function renderDays(){
    const calendar = document.querySelector("#calendar")

    for (let day = 1; day <= 35; day++) {

        calendar.insertAdjacentHTML("beforeend", `<div class="day">${day}</div>`);
    }
}
