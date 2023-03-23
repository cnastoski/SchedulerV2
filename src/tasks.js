const fs = require('fs')
const path = require('path')

/** TODO:
 *  implement addTasks + removeTasks function & button
 *
 */

export function renderTasks(document) {
    // pass in document instead of using the document global
    const tasksBody = document.getElementById("tasks")

    // read tasks file, will most likely get replaced by database lookup
    // easy to port to database, both functions will be callbacks
    fs.readFile(path.resolve(__dirname, "tasks.json"), (err, data) => {
        let html = ""
        JSON.parse(data).forEach((task) => {
            html += "<div class='task'>" + task.name + "<div class='task-sub'>"
                + task.date + "</div></div><br>"
        })


        tasksBody.innerHTML = html
    })

}

