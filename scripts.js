
'use strict'
const NUMBER_OF_QUESTIONS = 5;
let numberOfRow;
let selectedQuestion ='';
let answers = [];
let wiersze;

// Pobranie zawartości pliku tekstowego */

function getNumberOfRowOfQuestion() {
    let multiplier = 1+ Math.floor(Math.random() * NUMBER_OF_QUESTIONS);
    numberOfRow = 1+ 4 * multiplier;

    console.log('mulitplier', multiplier)
    console.log('number of row of question', numberOfRow)

}



function displayQuestion() {

    getNumberOfRowOfQuestion();
console.log('number of row of question', numberOfRow)
    

let url = 'source.txt';
  
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
        selectedQuestion = wiersze[numberOfRow-1];

console.log('wiersze',wiersze)




        console.log(wiersze[numberOfRow-1], 'quest')

        answers = [wiersze[numberOfRow], wiersze[numberOfRow+1], wiersze[numberOfRow+2]];
        document.querySelector('.app__question').textContent = selectedQuestion;

        orderAnswersRandomly();


       
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });

 // Załaduj pierwszy wiersz do .app__question
 
}


function orderAnswersRandomly() {
    console.log(answers)
     // Załaduj drugi wiersz do .app__answer

let freeSpots = [1, 2, 3];

for (let i = 0;  i<=answers.length+1; i++) {
    console.log('i', i)
    let assignedAnswerIndex = Math.floor(Math.random() * answers.length);
/*     let assignedSpotIndex = Math.floor(Math.random() * answers.length); */

    document.querySelector(`.app__answer--` + freeSpots[i]).textContent = answers[assignedAnswerIndex];

    answers.splice(assignedAnswerIndex, 1);
    /* freeSpots.splice(assignedSpotIndex,1); */


}




}



// Pobranie referencji do przycisku
let button = document.getElementById("generateQuestionButton");

// Dodanie obsługi zdarzenia kliknięcia do przycisku
button.addEventListener("click", displayQuestion);