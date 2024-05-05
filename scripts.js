'use strict'
let counterAllTestQuestions= 0;
let counterCorrectTestQuestions =0;
const ANSWERS_PER_QUESTION = 4 //has to agree with sorce.txt file
const FREE_SPOTS = [1, 2, 3, 4]; // spots for questions - must agree with above constants
const NUMBER_OF_TEST_QUESTIONS = 3;

const scopes = [{scopeName: 'scope-1', sourceFile: 'sources/source-1.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-2', sourceFile: 'sources/source-2.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-3', sourceFile: 'sources/source-3.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-4', sourceFile: 'sources/source-4.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-5', sourceFile: 'sources/source-5.txt', numberOfQuestions: 20}];

const sounds = [{soundName: 'correct', sourceFile: 'sounds/correct.txt'},
                {soundName: 'wrong', sourceFile: 'sounds/wrong.txt'},
                {soundName: 'hover', sourceFile: 'sounds/hover.txt'}];

let url=scopes[0].sourceFile; //default value to avoid error dueto lack of source file
let NUMBER_OF_QUESTIONS= scopes[0].numberOfQuestions; //default value to avoid error dueto lack of source file

let appScopes = document.querySelectorAll(".app__scopes");
    for (let appScope of appScopes) {
        // Dodaj nasłuchiwanie zdarzenia kliknięcia
        appScope.addEventListener("click", function() {
        
            switch (true) {
                case (appScope.classList.contains('app__scope--1')):
                    console.log('selected scope 1');
                    url = scopes[0].sourceFile;
                    console.log('url 1',url)
                    NUMBER_OF_QUESTIONS = scopes[0].numberOfQuestions;
                    break;
                case (appScope.classList.contains('app__scope--2')):
                    console.log('selected scope 2');
                    url = scopes[1].sourceFile;
                    console.log('url 2',url)
                    NUMBER_OF_QUESTIONS = scopes[1].numberOfQuestions;
                    break;
                case (appScope.classList.contains('app__scope--3')):
                    console.log('selected scope 3');
                    url = scopes[2].sourceFile;
                    console.log('url 3',url)
                    NUMBER_OF_QUESTIONS = scopes[2].numberOfQuestions;
                    break;
                case (appScope.classList.contains('app__scope--4')):
                    console.log('selected scope 4');
                    url = scopes[3].sourceFile;
                    console.log('url 4',url)
                    NUMBER_OF_QUESTIONS = scopes[3].numberOfQuestions;
                    break;
                case (appScope.classList.contains('app__scope--5')):
                    console.log('selected scope 5');
                    url = scopes[4].sourceFile;
                    console.log('url 5',url)
                    NUMBER_OF_QUESTIONS = scopes[4].numberOfQuestions;
                    break;
                default:
                    break;
            }  

        });
    }

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
    console.log('row with question',numberOfRow);

    return numberOfRow;
}



function displayQuestion() {

    if(isLearn === false) {
        counterAllTestQuestions++;
        document.querySelector('.app__score').textContent= counterCorrectTestQuestions + ' / ' + (counterAllTestQuestions-1);
        if (counterAllTestQuestions > NUMBER_OF_TEST_QUESTIONS) {
            
           /*  BLOCK ALSO OPTION OF CLICKING AGAIN TO AIU BUG 8 20/2*/
           //BELOW GENRATOR DOESNT WORK//
            document.querySelector('.app__test-summary').textContent = `You've scored ` + (counterCorrectTestQuestions/(counterAllTestQuestions-1)) *100 + ' %.'
            cleanContent();
            document.getElementById('generateQuestionButton').classList.add('hidden');
            
          
         
        }
    }



    getNumberOfRowOfQuestion();

    if(isLearn === true || counterAllTestQuestions <= NUMBER_OF_TEST_QUESTIONS) { 
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

    }
 
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
let button1 = document.getElementById("generateQuestionButton");
let button2 = document.getElementById("tryAgain");
// Dodanie obsługi zdarzenia kliknięcia do przycisku
button1.addEventListener("click", displayQuestion);
button2.addEventListener('click', takeTestAgain);

//BELOW FUNCTION IS USED FOR TESTING ONLY

/* function callBasicFunctionForTesting() {
    for (let i=0; i<=100;i++) {
        displayQuestion()
    } 
}
callBasicFunctionForTesting(); */



let appAnswers = document.querySelectorAll(".app__answers");
/* let selectedAnswer = document.querySelectorAll(".app__answer--1"); */
for (let appAnswer of appAnswers) {
    // Dodaj nasłuchiwanie zdarzenia kliknięcia
    appAnswer.addEventListener("click", function() {
        
    if(appAnswer.textContent === correctAnswer) {
        console.log('[SHOULD DISPLAY CORRECT]--->',appAnswer.textContent)
        if(isLearn === false) {
            counterCorrectTestQuestions++;
            
            
        }
    } else {
        console.log('[SHOULD DISPLAY WRONG] --->',appAnswer.textContent)
    }
    });
}


let modes = document.querySelectorAll('.app__modes');
let isLearn;

for (let mode of modes) {
    // Dodaj nasłuchiwanie zdarzenia kliknięcia
    mode.addEventListener("click", function() {
        // Dodaj klasę do wybranego elementu    
        cleanContent();
        if(mode.classList.contains('app__mode--test')) {
            console.log('selected TEST MODE')
            isLearn = false;
            document.getElementById('tryAgain').classList.remove('hidden');
            resetCounters();
            
        } else {
            console.log('selected LEARN MODE')
            isLearn = true;
            document.getElementById('tryAgain').classList.add('hidden');
            document.querySelector('.app__score').textContent=''
        }
        

    });
}


//IMPROVE THIS FUCNTION -INCLUDE COPY AND PASTE
function cleanContent() {

    document.querySelector('.app__question').textContent='';

    for (let i=1; i<=FREE_SPOTS.length; i++) {
        document.querySelector('.app__answer--'+i).textContent='';
    }
    
}

function resetCounters() {
    counterCorrectTestQuestions =0;
    counterAllTestQuestions=0;
    console.log('counters reset', counterCorrectTestQuestions, counterAllTestQuestions)
    document.querySelector('.app__score').textContent= '';
    document.querySelector('.app__test-summary').textContent='';              
}

function takeTestAgain() {
    console.log(`You're taking test again`);
    resetCounters();
    document.getElementById('generateQuestionButton').classList.remove('hidden');
    cleanContent();
      
}

