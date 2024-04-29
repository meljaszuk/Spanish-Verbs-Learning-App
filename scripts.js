let url = './source.txt';
// Zawartość pliku tekstowego w formie ciągu znaków
var tekstPliku = `To jest pytanie.
To jest odpowiedź.`;

// Podział ciągu na osobne wiersze
var wiersze = tekstPliku.split('\n');

// Załaduj pierwszy wiersz do .app__question
document.querySelector('.app__question').textContent = wiersze[0];

// Załaduj drugi wiersz do .app__answer
document.querySelector('.app__answer').textContent = wiersze[1];