# 🏯 Otaku Archive - Web Advanced Project

Otaku Archive is een single-page webapplicatie gemaakt voor het vak Web Advanced. Het project biedt een interactieve manier om anime te ontdekken via de Jikan API. Gebruikers kunnen zoeken naar titels, resultaten filteren op type of score, en hun favoriete anime opslaan in een persoonlijke collectie die bewaard blijft tussen sessies door.

---

## 🚀 Functionaliteiten

*   **Zoeken op titel**: 
    - Vind direct specifieke anime via de zoekbalk.
*   **Filter systeem**: 
    - Filter resultaten in een pop-up op type, status, score en genre.
*   **Sorteren**: 
    - Sorteer de getoonde kaarten op titel (A-Z) of op score (hoog/laag).
*   **Thema Switcher**: 
    - Wissel tussen Light Mode en Dark Mode.
*   **Favorieten**: 
    - Sla anime op in een persoonlijke lijst met de hartjes-knop.
*   **Detail Modal**: 
    - Klik op een kaart voor een pop-up met de synopsis en genres.
*   **Responsive Design**: 
    - De layout past zich aan voor mobiel, tablet en desktop.

---

## 🌐 Gebruikte API's

*   **Jikan API**: 
    - [https://docs.api.jikan.moe/](https://docs.api.jikan.moe/)

---

## ⚙️ Implementatie van technisch vereisten

| Vereiste | Lijnnummers | Beschrijving (Waar in `main.js`?) |
| :--- | :--- | :--- |
| **Elementen selecteren** | 5, 13, 23 | `getElementById`, `querySelector` |
| **Elementen manipuleren** | 183, 192 | `createElement`, `innerHTML` |
| **Events koppelen** | 26, 51, 81 | `addEventListener` |
| **Constanten (const)** | 5-23 | Overal gebruikt voor DOM en API |
| **Template literals** | 192-208 | HTML strings met `${anime.title}` |
| **Iteratie & array methodes** | 106, 217, 384 | `forEach`, `some`, `sort`, `map` |
| **Arrow functions** | 26, 86, 224 | `() => { ... }` syntax |
| **Ternary operator** | 201, 202 | Check voor episodes/chapters |
| **Async & Await** | 99, 141 | `async function` en `await fetch()` |
| **Fetch & JSON** | 102, 103 | Data ophalen en omzetten naar JSON |
| **LocalStorage** | 215, 394 | Favorieten en thema opslaan |
| **Formulier validatie** | 266-273 | Check op lege input + rode border |
| **Styling & layout** | ✔ | CSS Grid en Dark mode styling |
| **Tooling: Vite project** | ✔ | Projectstructuur met Vite |
| **Observer API** | X | /// |

---

## 🛠️ Installatiehandleiding

Volg deze stappen om het project lokaal op te starten met Vite:

1.  **Repository klonen**: 
    - `git clone https://github.com/Mry-af7/web-advanced-project.git`
2.  **Dependencies installeren**: 
    - `npm install`
3.  **Development server starten**: 
    - `npm run dev`
4.  **Applicatie bekijken**: 
    - -> `http://localhost:5173`

---

## 🖼️ Screenshots

### Startpagina [light & dark mode]
![Startpagina light](./images/Startpagina.png)
![Startpagina dark](./images/Startpagina%20[dark].png)

### Zoekfunctie + Filter
![Zoekfunctie](./images/Web-adv_search.png)
![filter](./images/Web-adv_filter.png)

### Favorieten
![Favorieten](./images/Web-adv_Mijn%20fav.png)

### Detailoverzicht
![Modal](./images/Web-adv_cardpopup.png)

---

## 📚 Gebruikte bronnen

*   **YouTube**: 
    - Bro Code. (2023, 31 Mei). HTML & CSS Full Course for free 🌎 
        -> [Bekijk video](https://www.youtube.com/watch?v=HGTJBPNC-Gw&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3)
    - Coding2GO. (2024, 7 augustus). Learn CSS FlexBox in 20 Minutes (Course)
        -> [Bekijk video](https://www.youtube.com/watch?v=wsTv9y931o8)

*   **W3Schools**: 
    - Javascript Tutorial 
        -> [Documentatie](https://www.w3schools.com/js/DEFAULT.asp)
    - CSS Tutorial
        -> [Documentatie](https://www.w3schools.com/css/)

*   **Cursus Web Advanced**: 
    - voor de basisprincipes van de SPA-opdracht

## 🤖 AI Chatlog [Gemini + chatGPT]

![1](./screenshots/1.png)
⁎
![2](./screenshots/2.png)
⁎
![3](./screenshots/3.png)
⁎
![4](./screenshots/4.png)
⁎
![5](./screenshots/5.png)
⁎
![6](./screenshots/6.png)
⁎
![7](./screenshots/7.png)
⁎
![8](./screenshots/8.png)
⁎
![9](./screenshots/9.png)
⁎
![10](./screenshots/10.png)
⁎
![14](./screenshots/14.png)
⁎
![11](./screenshots/11.png)
⁎
![12](./screenshots/12.png)
⁎
![13](./screenshots/13.png)
