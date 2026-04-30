
const animeList = document.getElementById("anime-list");
const apiURL = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity';

const zoekBtn = document.getElementById("search-btn");
const zoekInput = document.getElementById("search-input");

const modal = document.getElementById("anime-modal");
const modalDetails = document.getElementById("modal-details");
const closeBtn = document.querySelector(".close-modal");

//navigatie links
document.getElementById("logo-link").addEventListener("click", () => {
    haalAnimeOp();
});

document.getElementById("home-link").addEventListener("click", () => {
    haalAnimeOp();   
});

document.getElementById("top-link").addEventListener("click", () => {
    haalTopAnime();  
});

document.getElementById("manga-link").addEventListener("click", () => {
    haalManga();
});

document.getElementById("movie-link").addEventListener("click", () => {
    haalMovies();
});

document.getElementById("show-link").addEventListener("click", () => {
    haalShows();
});

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

//functie voor nav data
async function haalTopAnime() {
    try {
        const reactie = await fetch('https://api.jikan.moe/v4/top/anime?filter=favorite');
        const resultaat = await reactie.json();

        animeList.innerHTML = "";
        resultaat.data.forEach(anime => toonAnime(anime));
    } catch (fout) {
        console.log("Fout bij ophalen top anime:", fout);
    }
}

async function haalManga() {
    try {
        const reactie = await fetch('https://api.jikan.moe/v4/top/manga?limit=20');
        const resultaat = await reactie.json();

        animeList.innerHTML = "";
        resultaat.data.forEach(manga => toonAnime(manga));
    } catch (fout) {
        console.log("Fout bij ophalen manga:", fout);
    }
}

async function haalMovies() {
    try {
        const reactie = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=movie&limit=20');
        const resultaat = await reactie.json();

        animeList.innerHTML = "";
        resultaat.data.forEach(anime => toonAnime(anime));
    } catch (fout) {
        console.log("Fout bij ophalen movies:", fout);
    }
}

async function haalShows() {
    try {
        const reactie = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&type=tv&limit=20');
        const resultaat = await reactie.json();

        animeList.innerHTML = "";
        resultaat.data.forEach(anime => toonAnime(anime));
    } catch (fout) {
        console.log("Fout bij ophalen shows:", fout);
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
                ${anime.episodes ? `<p>Afleveringen: ${anime.episodes}</p>` : ''}
                ${anime.chapters ? `<p>Hoofdstukken: ${anime.chapters}</p>` : ''}
                <p>Status: ${anime.status}</p>
            </div>
        </div>

        <button class="fav-btn">❤ Favoriet</button>
    `;

//fav button
const favBtn = card.querySelector(".fav-btn");

    let favorieten = JSON.parse(localStorage.getItem("mijnFavorieten")) || [];

    const staatAlInLijst = favorieten.some(fav => fav.mal_id === anime.mal_id);
    
    if (staatAlInLijst) {
        favBtn.classList.add("active");
        favBtn.innerText = "❤ In Favorieten";
    }

    favBtn.addEventListener("click", () => {
        let actueleFavorieten = JSON.parse(localStorage.getItem("mijnFavorieten")) || [];
        
        const index = actueleFavorieten.findIndex(fav => fav.mal_id === anime.mal_id);

        if (index === -1) {
            actueleFavorieten.push(anime);
            favBtn.classList.add("active");
            favBtn.innerText = "❤ In Favorieten";

            console.log("Toegevoegd:", anime.title);
        } else {
            actueleFavorieten.splice(index, 1);
            favBtn.classList.remove("active");
            favBtn.innerText = "❤ Favoriet";

            console.log("Verwijderd:", anime.title);
        }

        if (document.getElementById("anime-list").dataset.view === "favorieten") {
            card.remove();
        }

        localStorage.setItem("mijnFavorieten", JSON.stringify(actueleFavorieten));
    });

    // klik op kaart voor details (!= fav knop)
    card.addEventListener("click", (e) => {
        if (!e.target.classList.contains('fav-btn')) {
            openModal(anime);
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

//Mijn favorieten 
const favListBtn = document.getElementById("fav-list-btn");

favListBtn.addEventListener("click", () => {
    const favorieten = JSON.parse(localStorage.getItem("mijnFavorieten")) || [];

    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = "";
    animeList.dataset.view = "favorieten";  

    if (favorieten.length == 0) {
        animeList.innerHTML = "<p>Je hebt nog geen favorieten opgeslagen.</p>";
    } else {
        favorieten.forEach(anime => {
            toonAnime(anime);
        });
    }
});

//Modal voor +info per anime
function openModal(anime) {
    modalDetails.innerHTML = `
        <div class="modal-flex">
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
            <div class="modal-text">
                <h2>${anime.title}</h2>
                <p><strong>Score:</strong> ⭐ ${anime.score || "N/A"}</p>
                <p><strong>Gepubliceerd:</strong> ${anime.aired?.string || anime.published?.string || "N/A"}</p>
                <p><strong>Genres:</strong> ${anime.genres.map(g => g.name).join(", ")}</p>
                <p class="synopsis">${anime.synopsis || "Geen samenvatting beschikbaar."}</p>
            </div>
        </div>
    `;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";    
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";   
    }
}

haalAnimeOp();

