const fs = require('fs')
const path = require('path')

function renderHome () {
    const body = document.getElementById("body-container");
    fs.readFile(path.resolve(__dirname, "main.html"), (err, data) => {
        body.innerHTML = data
    })
}

function renderSettings () {
    const body = document.getElementById("body-container");
    fs.readFile(path.resolve(__dirname, "settings.html"), (err, data) => {
        body.innerHTML = data
    })

}

const homeButton = document.getElementById("homeButton")
homeButton.addEventListener("click", renderHome)

const settingsButton = document.getElementById("settingsButton")
settingsButton.addEventListener("click", renderSettings)