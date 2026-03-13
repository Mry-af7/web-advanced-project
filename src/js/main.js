
const apiURL = 'https://api.jikan.moe/v4/top/anime';

//functie voor data
async function haalAnimeOp() {
    try {
        const reactie = await fetch(apiURL);
        const resultaat = await reactie.json();
        
        //CHECK
        console.log("De data is binnen:", resultaat.data);
    } catch (fout) {
        console.log("Er is iets misgegaan:", fout);
    }
}

haalAnimeOp();