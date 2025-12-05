//we are going to make an event listener.. it will trigger woth the DOM is loaded (aka visiting webpage)
addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("https://localhost:3000/api/songs")
    const songs = await response.json()

    let html = ""
    for (let song of songs){
        let songID = song._id
        html+=`<li>${song.title} - ${song.artist}</li> - <a href="detail.html?id=${songID}">Details</a> </li>`


        document.querySelector("#list_of_songs").innerHTML = html
    }
})