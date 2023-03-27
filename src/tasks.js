const Sortable = require('sortablejs')
const fs = require('fs')
const path = require('path')

/** TODO:
 *  implement addTasks + removeTasks function & button
 *
 */

export function renderTasks() {
    const tasksBody = document.getElementById("tasks")

    // read tasks file, will most likely get replaced by database lookup
    // easy to port to database, both functions will be callbacks
    fs.readFile(path.resolve(__dirname, "tasks.json"), (err, data) => {
        if (data.length !== 0) {
            let html = ""
            let arr = JSON.parse(data)
            for (let i = 0; i < arr.length; i++) {
                let date = new Date(arr[i].date)
                html += "<div class='task'>" + arr[i].name + "<div class='task-sub'>"
                    + date.toLocaleDateString("en-us", {timezone: "America/Detroit"}) + "</div></div>"
            }
            tasksBody.innerHTML = html
        }

        // these say "unused" but they are very much used!
        let sortableTasks = Sortable.create(tasksBody, {
            onSort: (evt) => {
                saveTasks()
            }
        })

        document.getElementById("taskAddPageButton")
            .addEventListener("click", transitionToAddTasks)

        document.getElementById("addTaskButton")
            .addEventListener("click", addTask)

        document.getElementById("exitTasksAddPageButton")
            .addEventListener("click", transitionFromAddTasks)

    })
}

function saveTasks() {
    let objects = []
    let tasks = [...document.getElementsByClassName("task")]

    tasks.forEach((task) => {
        let text = task.innerText.split("\n")

        objects.push({
            "name" : text[0],
            "date" : Date.parse(text[1])
        })
    })

    fs.writeFile('./src/tasks.json', JSON.stringify(objects), (err) =>{
        if (err) throw err
    })
}

function transitionToAddTasks() {
    document.getElementById("tasksDisplay").classList.add("hidden")

    document.getElementById("addTasks").classList.remove("hidden")
    document.getElementById("addTasks").classList.add("visible")
}

function transitionFromAddTasks() {
    document.getElementById("addTasks").classList.remove("visible")
    document.getElementById("addTasks").classList.add("hidden")

    document.getElementById("tasksDisplay").classList.remove("hidden")
    document.getElementById("tasksDisplay").classList.add("visible")
}

function addTask() {
    let form = document.forms["addTaskForm"]
    if (form.elements["taskNameForm"].value === "" || form.elements["taskDateForm"].value === "") {
        window.alert("Please provide details for your task!")
        return
    }

    let taskName = form.elements["taskNameForm"].value
    let taskDate = new Date(Date.parse(form.elements["taskDateForm"].value + "T00:00"))

    let tasksBody = document.getElementById("tasks")
    tasksBody.insertAdjacentHTML("afterbegin",
        "<div class='task'>" + taskName
        + "<div class='task-sub'>"
        + taskDate.toLocaleDateString("en-us", {timezone: "America/Detroit"}) + "</div></div>")

    transitionFromAddTasks()

    form.reset()

    saveTasks()

}



