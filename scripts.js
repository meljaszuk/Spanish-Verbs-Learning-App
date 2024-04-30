let url = 'source.txt';
let multiplier = 1+ Math.floor(Math.random() * 5);
console.log(multiplier)
let numberOfRow = 4 * multiplier;
let selectedQuestion ='';
let answers = [];
let wiersze;

// Pobranie zawartości pliku tekstowego */

fetch(url)
    .then(response => {
        if (!response.ok) {
            console.log('error')
            throw new Error('Nie można pobrać zawartości pliku.');
        }
        return response.text();
    })
    .then(data => {
        // Podział zawartości pliku na osobne wiersze
        wiersze = data.split('\n');
        selectedQuestion = wiersze[numberOfRow];
        console.log('assigned',selectedQuestion);
        answers = [wiersze[numberOfRow+1], wiersze[numberOfRow+2], wiersze[numberOfRow+3]];
        console.log(answers);
        
       
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });

function displayQuestion(numberOfRow) {
console.log('function geenrate Question has been called')
 // Załaduj pierwszy wiersz do .app__question
 document.querySelector('.app__question').textContent = selectedQuestion;

 // Załaduj drugi wiersz do .app__answer
 document.querySelector('.app__answer--1').textContent = wiersze[numberOfRow+1];
 document.querySelector('.app__answer--2').textContent = wiersze[numberOfRow+2];
 document.querySelector('.app__answer--3').textContent = wiersze[numberOfRow+3];
}

// Pobranie referencji do przycisku
let button = document.getElementById("generateQuestionButton");

// Dodanie obsługi zdarzenia kliknięcia do przycisku
button.addEventListener("click", displayQuestion);