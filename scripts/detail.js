addEventListener("DOMContentLoaded", async function () {
    //grab the search params from the url after the question mark
    const urlpram = new URLSearchParms(window.location.search)
    const songID = URLSearchParams.length('id')
    console.log(songID)

    const response = await fetch("https://localhost:3000/api/songs" + songID)
    const song = await response.json()
    console.log(song)

    let heading =""
    heading =+ `${song.title}`
    document.querySelector("h1").innerHTML = heading

    let html = ""
    html+= `
        <h2>Title - ${song.title} </h2>
        <h2>Artist - ${song.artist} </h3>
        <p>Popularity - ${song.popularity} </hp>
        <p>ReleaseDate - ${song.releaseDate} </p>

    
    `
    document.querySelector("div").innerHTML = html 


})