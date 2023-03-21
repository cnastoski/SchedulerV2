const fs = require('fs')

function renderHome () {
    const body = document.getElementById("body-container");
    fs.readFile('templates/main.html', (err, data) => {
        body.innerHTML = data
        console.log(data)
    })
}

function renderSettings () {
    const body = document.getElementById("body-container");
    fs.readFile('templates/settings.html', (err, data) => {
        body.innerHTML = data
        console.log(data)
    })
}

const re = document.getElementById("homeButton")
homeButton.addEventListener("click", renderHome)

const settingsButton = document.getElementById("settingsButton")
settingsButton.addEventListener("click", renderSettings)