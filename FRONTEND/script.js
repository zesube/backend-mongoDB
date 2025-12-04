//we are going to make an event listener.. it will trigger when the DOM is loaded (aka upon visiting webpage)
addEventListener("DOMContentLoaded", async function(){
    try {
        console.log("Fetching songs from http://localhost:3000/api/songs...");
        const response = await fetch("http://localhost:3000/api/songs");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const songs = await response.json();
        console.log("Songs fetched:", songs);

        if (!songs || songs.length === 0) {
            document.querySelector("ul").innerHTML = '<li style="color: orange;">No songs found in database</li>';
            return;
        }

        let html = "";
        for (let song of songs ){
            html+=`<li>${song.title} - ${song.artist}</li>`;
        }

        document.querySelector("ul").innerHTML = html;
    } catch (err) {
        console.error('Error fetching songs:', err);
        document.querySelector("ul").innerHTML = `<li style="color: red;">Error: ${err.message}</li>`;
    }
})