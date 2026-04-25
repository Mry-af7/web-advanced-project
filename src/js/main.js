
const animeList = document.getElementById("anime-list");
const apiURL = 'https://api.jikan.moe/v4/top/anime';

const zoekBtn = document.getElementById("search-btn");
const zoekInput = document.getElementById("search-input");

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
        console.log("Fout bij ophalen top anime:", fout);
    }
}

//search functie
async function zoekAnime(query) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=20`);
        const resultaat = await response.json();
        
        animeList.innerHTML = ""; 
        resultaat.data.forEach(anime => toonAnime(anime));
    } catch (fout) {
        console.log("Zoekfout:", fout);
    }
}

//functie anime-card
function toonAnime(anime) {

    const card = document.createElement("article");
    card.classList.add("anime-card");

    //template
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

//fav button
const favBtn = card.querySelector(".fav-btn");        
    
 favBtn.addEventListener("click", () => {   

    let favorieten =
        JSON.parse(localStorage.getItem("mijnFavorieten")) || [];

    // check for dups
    const bestaatAl = favorieten.some(fav => fav.mal_id === anime.mal_id);

    if (!bestaatAl) {
        favorieten.push(anime);
        localStorage.setItem(
            "mijnFavorieten",
            JSON.stringify(favorieten)
        );
        console.log("Toegevoegd:", anime.title);
    } else {
        console.log("Bestaat al in favorieten");
    }
});

    animeList.appendChild(card);
}

//seach w button
zoekBtn.addEventListener("click", () => {
    const zoekTerm = zoekInput.value;
    if (zoekTerm) {
        zoekAnime(zoekTerm);
    }
});

//search w enter
zoekInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        zoekBtn.click();
    }
});

haalAnimeOp();

