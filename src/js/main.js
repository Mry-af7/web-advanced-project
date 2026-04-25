
const animeList = document.getElementById("anime-list");

const apiURL = 'https://api.jikan.moe/v4/top/anime';

//functie voor data
async function haalAnimeOp() {
    try {
        const reactie = await fetch(apiURL);
        const resultaat = await reactie.json();

        animeList.innerHTML = "";

        resultaat.data.forEach(anime => {
            toonAnime(anime);
        });

    } catch (fout) {
        console.log("Fout:", fout);
    }
}



//functie anime
function toonAnime(anime) {

    const card = document.createElement("article");
    card.classList.add("anime-card");

    card.innerHTML = `
        <img src="${anime.images.jpg.image_url}">

        <div class="card-content">
            <h2>${anime.title}</h2>

            <div class="anime-info">
                <p>Score: ${anime.score}</p>
                <p>Type: ${anime.type}</p>
                <p>Afleveringen: ${anime.episodes}</p>
                <p>Status: ${anime.status}</p>
            </div>
        </div>

        <button class="fav-btn">Favoriet</button>
    `;

    animeList.appendChild(card);
}

haalAnimeOp();