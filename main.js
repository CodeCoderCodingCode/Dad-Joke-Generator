const startMenu = document.getElementById("start-menu");
const jokeContainer = document.getElementById("joke-container");
const jokeOutput = document.getElementById("joke-output");

// Start- und Übergangs-Funktionen anpassen
function startProgramm() {
    // Das Startmenü wird ausgeblendet
    startMenu.style.display = "none";
    // Der Joke-Container wird angezeigt
    jokeContainer.style.display = "block";
    jokeContainer.classList.add("fadeIn");  // Animation anwenden
    document.body.classList.add("color-transition");
    // Den Titel "Find the perfect joke!" animieren
    const jokeTitle = document.getElementById("find-joke-title");
    jokeTitle.style.opacity = 1;  // Sicherstellen, dass der Titel nach dem Laden sichtbar wird
}

// Die Funktion zur Suche und Anzeige des Witzes bleibt gleich, keine Änderungen nötig.


async function generateJoke() {
    try {
        // API-Abfrage für einen zufälligen Dad Joke
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',  // Wir möchten die Antwort im JSON-Format
            },
        });

        if (!response.ok) {
            throw new Error("API-Antwort ist nicht OK");
        }

        const data = await response.json();  // Antwort in JSON umwandeln

        // Überprüfen, ob die Antwort einen Witz enthält
        if (data.joke) {
            // Den Witz in das Ausgabe-Element einfügen
            jokeOutput.textContent = data.joke;
        } else {
            jokeOutput.textContent = "Oops, kein Witz gefunden!";
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Witzes:", error);
        jokeOutput.textContent = "Fehler beim Laden des Witzes.";
    }
}

async function searchJoke() {
    const searchTerm = document.getElementById("joke-search").value;

    // Überprüfen, ob der Suchbegriff leer ist
    if (searchTerm.trim() === "") {
        jokeOutput.textContent = "Bitte einen Suchbegriff eingeben!";
        return;
    }

    try {
        // API-Abfrage für die Suche nach einem Witz basierend auf dem Suchbegriff
        const response = await fetch(`https://icanhazdadjoke.com/search?term=${searchTerm}`, {
            headers: {
                'Accept': 'application/json',  // Wir möchten die Antwort im JSON-Format
            },
        });

        if (!response.ok) {
            throw new Error("API-Antwort ist nicht OK");
        }

        const data = await response.json();  // Antwort in JSON umwandeln

        // Überprüfen, ob es Ergebnisse gibt
        if (data.results && data.results.length > 0) {
            jokeOutput.textContent = data.results[0].joke;  // Zeige den ersten Witz
        } else {
            jokeOutput.textContent = `Kein Witz gefunden für '${searchTerm}'`;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Witzes:", error);
        jokeOutput.textContent = "Fehler beim Laden des Witzes.";
    }
}

function copyJoke() {
    const text = jokeOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showCopyNotification("Joke Copied!"); // Benachrichtigung anzeigen
    });
}

function showCopyNotification(message) {
    // Benachrichtigungs-Element erstellen
    const notification = document.createElement("div");
    notification.classList.add("copy-notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animation für das Einblenden und das Verlassen der Benachrichtigung
    setTimeout(() => {
        notification.classList.add("show");
    }, 100); // Verzögerung für das Einblenden

    // Benachrichtigung nach 3 Sekunden verschwinden lassen
    setTimeout(() => {
        notification.classList.remove("show");
        notification.classList.add("hide");
        // Nach der Animation das Element entfernen
        setTimeout(() => {
            notification.remove();
        }, 500); // Verstecken nach der Animation
    }, 3000);
}

// Funktion für Partikel
function createParticles() {
    const numParticles = 20; // Anzahl der Partikel
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        document.body.appendChild(particle);

        // Zufällige Position und Animation
        const size = Math.random() * 10 + 5; // Zufällige Größe
        const duration = Math.random() * 3 + 2; // Zufällige Dauer der Animation
        const x = Math.random() * window.innerWidth; // Zufällige x-Position
        const y = Math.random() * window.innerHeight; // Zufällige y-Position

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDuration = `${duration}s`;

        // Entfernen der Partikel nach der Animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000); // nach Dauer entfernen
    }
}

// Aufruf der Partikel-Erstellungsfunktion
createParticles();

// Alle 2 Sekunden neue Partikel erstellen
setInterval(createParticles, 2000);


window.startProgramm = startProgramm;
window.generateJoke = generateJoke;
window.searchJoke = searchJoke;
window.copyJoke = copyJoke;
