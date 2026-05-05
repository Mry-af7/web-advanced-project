
let origineleVolgorde = [];

const animeList = document.getElementById("anime-list");
const apiURL = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity';

const zoekBtn = document.getElementById("search-btn");
const zoekInput = document.getElementById("search-input");

const modal = document.getElementById("anime-modal");
const modalDetails = document.getElementById("modal-details");
const closeBtn = document.querySelector(".close-modal");

const filterModal = document.getElementById("filter-modal");
const filterBtn = document.getElementById("filter-btn");
const closeFilter = document.getElementById("close-filter");
const pasFilterToe = document.getElementById("pas-filter-toe");
const resetFilter = document.getElementById("reset-filter");

const sorteerSelect = document.getElementById("sorteer-select");

const themaBtn = document.getElementById("thema-btn");

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

//filter 
filterBtn.addEventListener("click", () => {
    filterModal.style.display = "block";
    document.body.style.overflow = "hidden";
});

closeFilter.addEventListener("click", () => {
    filterModal.style.display = "none";
    document.body.style.overflow = "";
});

window.addEventListener("click", (event) => {
    if (event.target == filterModal) {
        filterModal.style.display = "none";
        document.body.style.overflow = "";
    }
});

pasFilterToe.addEventListener("click", () => {
    pasFiltersToe();
});

resetFilter.addEventListener("click", () => {
    document.querySelectorAll('.filter-groep input').forEach(cb => cb.checked = false);
    document.querySelectorAll('.anime-card').forEach(kaart => kaart.style.display = '');
    filterModal.style.display = "none";
    document.body.style.overflow = "";
});

sorteerSelect.addEventListener("change", () => {
    sorteerKaarten(sorteerSelect.value);
});

themaBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
    if (document.body.classList.contains("dark")) {
        themaBtn.textContent = "☀︎ Light Mode";
        localStorage.setItem("thema", "dark");
    } else {
        themaBtn.textContent = "☾ Dark Mode";
        localStorage.setItem("thema", "light");
    }
});

//functie voor data
async function haalAnimeOp() {
    origineleVolgorde = []; 
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
    origineleVolgorde = []; 
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
    origineleVolgorde = []; 
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
    origineleVolgorde = []; 
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
    origineleVolgorde = []; 
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
    card.dataset.type = anime.type || "";
    card.dataset.status = anime.status || "";
    card.dataset.score = anime.score || 0;
    card.dataset.genres = anime.genres ? anime.genres.map(g => g.name).join(',') : "";
    card.dataset.titel = anime.title || "";
    
    //template
    card.innerHTML = `
        <img src="${anime.images.jpg.image_url}">

        <div class="card-content">
            <h2>${anime.title}</h2>

            <div class="anime-info">
                <p>Score: ${anime.score ? anime.score : "Niet beschikbaar"}</p>
                <p>Type: ${anime.type ? anime.type : "Onbekend"}</p>
                ${anime.episodes ? `<p>Afleveringen: ${anime.episodes}</p>` : ''}
                ${anime.chapters ? `<p>Hoofdstukken: ${anime.chapters}</p>` : ''}
                <p>Status: ${anime.status ? anime.status : "Onbekend"}</p>
                <p>Rating: ${anime.rating ? anime.rating : "Geen rating"}</p>
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

    origineleVolgorde.push(card); 

    animeList.appendChild(card);
}

//seach w button
zoekBtn.addEventListener("click", () => {
    const zoekTerm = zoekInput.value.trim();   
    if (zoekTerm === "") {
        zoekInput.style.border = "2px solid #e74c3c";   
        zoekInput.placeholder = "Vul iets in...";
    } else {
        zoekInput.style.border = "";       
        zoekInput.placeholder = "Zoek je volgende avontuur...";
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

//filter functie
function pasFiltersToe() {
    const kaarten = document.querySelectorAll('.anime-card');

    kaarten.forEach(kaart => {
        let tonen = true;

        const typeChecks = document.querySelectorAll('.filter-groep:nth-child(2) input:checked');
        if (typeChecks.length > 0) {
            let typeMatch = false;
            typeChecks.forEach(cb => {
                if (cb.value === kaart.dataset.type) typeMatch = true;
            });
            if (!typeMatch) tonen = false;
        }

        const statusChecks = document.querySelectorAll('.filter-groep:nth-child(3) input:checked');
        if (statusChecks.length > 0) {
            let statusMatch = false;
            statusChecks.forEach(cb => {
                if (cb.value === kaart.dataset.status) statusMatch = true;
            });
            if (!statusMatch) tonen = false;
        }

        const scoreChecks = document.querySelectorAll('.filter-groep:nth-child(4) input:checked');
        if (scoreChecks.length > 0) {
            let scoreMatch = false;
            scoreChecks.forEach(cb => {
                if (Number(kaart.dataset.score) >= Number(cb.value)) scoreMatch = true;
            });
            if (!scoreMatch) tonen = false;
        }

        kaart.style.display = tonen ? '' : 'none';
    });

    filterModal.style.display = "none";
    document.body.style.overflow = "";
}

//Soteer functie
function sorteerKaarten(keuze) {
    if (keuze === "standaard") {
        origineleVolgorde.forEach(kaart => animeList.appendChild(kaart));
        return;
    }

    const kaarten = Array.from(document.querySelectorAll('.anime-card'));
    
    kaarten.sort((a, b) => {
        if (keuze === "score-hoog") return Number(b.dataset.score) - Number(a.dataset.score);
        if (keuze === "score-laag") return Number(a.dataset.score) - Number(b.dataset.score);
        if (keuze === "titel-az") return a.dataset.titel.localeCompare(b.dataset.titel);
        if (keuze === "titel-za") return b.dataset.titel.localeCompare(a.dataset.titel);
    });

    kaarten.forEach(kaart => animeList.appendChild(kaart));
}

// keep thema bij refresh
const opgeslagenThema = localStorage.getItem("thema");
if (opgeslagenThema === "dark") {
    document.body.classList.add("dark");
    themaBtn.textContent = "☀︎ Light Mode";
}

haalAnimeOp();

