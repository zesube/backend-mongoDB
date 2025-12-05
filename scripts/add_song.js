addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", addSong);
});

async function addSong() {
    const song = {
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#date").value, // match HTML id
        popularity: document.querySelector("#popularity").value,
        genre: document.querySelector("#genre").value
            ? document.querySelector("#genre").value.split(",")
            : []
    };

    try {
        const response = await fetch("http://localhost:3000/api/songs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
        });

        if (response.ok) {
            const results = await response.json();
            alert("Added song with ID of " + results._id);
            document.querySelector("form").reset();
        } else {
            document.querySelector("#err").innerHTML = "Cannot add song";
        }
    } catch (err) {
        console.error(err);
        document.querySelector("#err").innerHTML = "Network error";
    }
}

