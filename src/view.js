import {renderTasks} from "./tasks.js";
import { nextMonthHandler, prevMonthHandler, renderCalendar } from "./calendar.js";

const fs = require('fs')
const path = require('path')


function renderHome () {
    const body = document.getElementById("body-container");
    fs.readFile(path.resolve(__dirname, "main.html"), (err, data) => {
        body.innerHTML = data

        let selectedDate = null;
        const date = new Date();

        renderCalendar(date, selectedDate);

        const prevBtn = document.querySelector("#prev-btn");
        const nextBtn = document.querySelector("#next-btn");

        prevBtn.addEventListener('click', () => {
            prevMonthHandler();
        });
        
        nextBtn.addEventListener('click', () => {
            nextMonthHandler();
        });

        document.addEventListener('click', function(element){
            //hide context menu if it is up
            const menu = document.getElementById("task-menu");
            if (menu){
                const isClickedOutside = !menu.contains(element.target);
                if (isClickedOutside) {
                    // Hide the menu
                    menu.classList.add('hidden');
                    document.removeEventListener("click", element);
                }      
            }

        })

    })

}

function renderSettings () {
    const body = document.getElementById("body-container");
    fs.readFile(path.resolve(__dirname, "settings.html"), (err, data) => {
        body.innerHTML = data
    })

}

function renderTasksPage () {
    const body = document.getElementById("body-container");
    fs.readFile(path.resolve(__dirname, "tasks.html"), (err, data) => {
        body.innerHTML = data
        renderTasks()
        // fs.readFile is an async function,
        // so renderTasks() gets run only during the callback
    })
}

window.addEventListener('load', renderHome)

// consider condensing this or changing system for it
const homeButton = document.getElementById("homeButton")
homeButton.addEventListener("click", renderHome)

const settingsButton = document.getElementById("settingsButton")
settingsButton.addEventListener("click", renderSettings)

const tasksPageButton = document.getElementById("tasksPageButton")
tasksPageButton.addEventListener("click", renderTasksPage)
