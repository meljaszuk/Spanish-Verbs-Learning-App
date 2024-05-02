'use strict'
const NUMBER_OF_QUESTIONS = 1000;  //has to agree with sorce.txt file
const ANSWERS_PER_QUESTION = 4 //has to agree with sorce.txt file
const FREE_SPOTS = [1, 2, 3, 4]; // spots for questions - must agree with above constants
let numberOfRow;
let selectedQuestion ='';
let answers = [];
let correctAnswer;
let wiersze;

// Pobranie zawartości pliku tekstowego */

function getNumberOfRowOfQuestion() {
    let multiplier = 1+ Math.floor(Math.random() * (NUMBER_OF_QUESTIONS-1));
    numberOfRow = 1+ (ANSWERS_PER_QUESTION + 1) * multiplier;

    /* console.log('mulitplier', multiplier)
    console.log('number of row of question', numberOfRow) */

}



function displayQuestion() {

    getNumberOfRowOfQuestion();
console.log('row with question',numberOfRow)
    

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

/* console.log('wiersze',wiersze) */




        /* console.log(wiersze[numberOfRow-1], 'quest') */

        answers = [wiersze[numberOfRow], wiersze[numberOfRow+1], wiersze[numberOfRow+2], wiersze[numberOfRow+3]];
        correctAnswer = answers[0]
        document.querySelector('.app__question').textContent = selectedQuestion;

        orderAnswersRandomly();


       
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });

 // Załaduj pierwszy wiersz do .app__question
 
}


function orderAnswersRandomly() {
    /* console.log(answers) */
     // Załaduj drugi wiersz do .app__answer



for (let i = 0;  i<FREE_SPOTS.length; i++) {
    /* console.log('i', i) */
    let assignedAnswerIndex = Math.floor(Math.random() * (answers.length));
/*     let assignedSpotIndex = Math.floor(Math.random() * answers.length); */

    document.querySelector(`.app__answer--` + FREE_SPOTS[i]).textContent = answers[assignedAnswerIndex];

    answers.splice(assignedAnswerIndex, 1);
    /* freeSpots.splice(assignedSpotIndex,1); */


}




}



// Pobranie referencji do przycisku
let button = document.getElementById("generateQuestionButton");

// Dodanie obsługi zdarzenia kliknięcia do przycisku
button.addEventListener("click", displayQuestion);

//BELOW FUNCTION IS USED FOR TESTING ONLY

/* function callBasicFunctionForTesting() {
    for (let i=0; i<=100;i++) {
        displayQuestion()
    } 
}
callBasicFunctionForTesting(); */



let appAnswers = document.querySelectorAll(".app__answer");
let selectedAnswer = document.querySelectorAll(".app__answer--1");



for (let appAnswer of appAnswers) {
    // Dodaj nasłuchiwanie zdarzenia kliknięcia
    appAnswer.addEventListener("click", function() {
        // Dodaj klasę do wybranego elementu    
       
        if(appAnswer.textContent === correctAnswer) {
            console.log('[CORRECT]',appAnswer.textContent)
        } else {
            console.log('[WRONG]',appAnswer.textContent)
        }
        

    });
}
