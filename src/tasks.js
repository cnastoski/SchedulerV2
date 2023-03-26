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
        let html = ""
        let arr = JSON.parse(data)
        for (let i = 0; i < arr.length; i++) {
            html += "<div class='task' draggable='true'>" + arr[i].name + "<div class='task-sub'>"
                + arr[i].date + "</div></div>"
        }
        tasksBody.innerHTML = html

        // these say "unused" but they are very much used!
        let sortableTasks = Sortable.create(tasksBody, {
            onSort: (evt) => {
                saveTasks()
            }
        })

    })
}

function saveTasks() {
    let objects = []
    let tasks = [...document.getElementsByClassName("task")]

    tasks.forEach((task) => {
        let text = task.innerText.split("\n")

        objects.push({
            "name" : text[0],
            "date" : text[1]
        })
    })

    fs.writeFile('./src/tasks.json', JSON.stringify(objects), (err) =>{
        if (err) throw err
    })
}



