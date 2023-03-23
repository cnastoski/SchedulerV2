import {renderTasks} from "./tasks.js";
import { renderCalendar } from "./calendar.js";

const fs = require('fs')
const path = require('path')


function renderHome () {
    const body = document.getElementById("body-container");
    fs.readFile(path.resolve(__dirname, "main.html"), (err, data) => {
        body.innerHTML = data
        renderCalendar();
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
        renderTasks(document)
        // fs.readFile is an async function,
        // so renderTasks() gets run only during the callback
    })
}


// consider condensing this or changing system for it
const homeButton = document.getElementById("homeButton")
homeButton.addEventListener("click", renderHome)

const settingsButton = document.getElementById("settingsButton")
settingsButton.addEventListener("click", renderSettings)

const tasksPageButton = document.getElementById("tasksPageButton")
tasksPageButton.addEventListener("click", renderTasksPage)