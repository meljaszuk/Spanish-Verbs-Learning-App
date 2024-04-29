let url = 'source.txt';
let numberOfRow = 4;
let orderOfAnswers = [];

// Pobranie referencji do przycisku
let button = document.getElementById("generateButton");

// Dodanie obsługi zdarzenia kliknięcia do przycisku
button.addEventListener("click", generateQuestion);



function generateQuestion(numberOfRow) {
// Pobranie zawartości pliku tekstowego

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Nie można pobrać zawartości pliku.');
        }
        return response.text();
    })
    .then(data => {
        // Podział zawartości pliku na osobne wiersze
        var wiersze = data.split('\n');

        // Załaduj pierwszy wiersz do .app__question
        document.querySelector('.app__question').textContent = wiersze[numberOfRow];

        // Załaduj drugi wiersz do .app__answer
        document.querySelector('.app__answer--1').textContent = wiersze[numberOfRow+1];
        document.querySelector('.app__answer--2').textContent = wiersze[numberOfRow+2];
        document.querySelector('.app__answer--3').textContent = wiersze[numberOfRow+3];
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    })
};