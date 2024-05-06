'use strict'
const scopes = [{scopeName: 'scope-1', sourceFile: 'sources/source-1.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-2', sourceFile: 'sources/source-2.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-3', sourceFile: 'sources/source-3.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-4', sourceFile: 'sources/source-4.txt', numberOfQuestions: 1000},
                {scopeName: 'scope-5', sourceFile: 'sources/source-5.txt', numberOfQuestions: 20}];
                
const ANSWERS_PER_QUESTION = 4;
const FREE_SPOTS = [1, 2, 3, 4];
const NUMBER_OF_TEST_QUESTIONS = 5;

let counterAllTestQuestions = 0;
let counterCorrectTestQuestions = 0;
let isLearn = true;
let url = scopes[0].sourceFile;
let numberOfQuestionsInSourceFile = scopes[0].numberOfQuestions;
let appScopes = document.querySelectorAll(".app__scopes");

document.getElementById("generateQuestionButton").addEventListener("click", displayQuestion);
document.getElementById("tryAgain").addEventListener('click', takeTestAgain);

for (let appScope of appScopes) {
    appScope.addEventListener("click", function() {
        switch (true) {
            case (appScope.classList.contains('app__scope--1')):
                getReferences(1);           
                break;
            case (appScope.classList.contains('app__scope--2')):
                getReferences(2);
                break;
            case (appScope.classList.contains('app__scope--3')):
                getReferences(3);
                break;
            case (appScope.classList.contains('app__scope--4')):
                getReferences(4);
                break;
            case (appScope.classList.contains('app__scope--5')):
                getReferences(5);
                break;
            default:
                break;
        };   

        function getReferences(identifier) {
            console.log('selcted scope: ',identifier);
            url = scopes[identifier - 1].sourceFile;
            console.log('url: ', url);
            numberOfQuestionsInSourceFile = scopes[identifier - 1].numberOfQuestions;
        };
    });
};

let numberOfRow;
let selectedQuestion ='';
let answers = [];
let correctAnswer;
let rowInSourceFile;

function getNumberOfRowOfQuestion() {
    let multiplier = 1 + Math.floor(Math.random() * (numberOfQuestionsInSourceFile - 1));
    numberOfRow = 1 + (ANSWERS_PER_QUESTION + 1) * multiplier;
    console.log('Row with question:',numberOfRow);

    return numberOfRow;
};

function displayQuestion() {
    if (isLearn) {
        document.getElementById('generateQuestionButton').textContent='Next';
    } else {
        document.getElementById('generateQuestionButton').classList.add('hidden');
        document.getElementById('tryAgain').classList.remove('hidden');
    };

    if (!isLearn) {
        counterAllTestQuestions++;
        document.querySelector('.app__score').textContent= counterCorrectTestQuestions + ' / ' + (counterAllTestQuestions - 1);
        if (counterAllTestQuestions > NUMBER_OF_TEST_QUESTIONS) {
            document.querySelector('.app__test-summary').textContent = `You've scored ` + Math.round((counterCorrectTestQuestions/(counterAllTestQuestions - 1)) * 100) + ' %.';
            cleanContent();
            document.getElementById('generateQuestionButton').classList.add('hidden');
        };
    };

    getNumberOfRowOfQuestion();

    if (isLearn || counterAllTestQuestions <= NUMBER_OF_TEST_QUESTIONS) { 
        fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log('error')
                throw new Error(`File can't be loaded.`);
            }
            return response.text();
        })
        .then(data => {
            rowInSourceFile = data.split('\n');
            selectedQuestion = rowInSourceFile[numberOfRow - 1];
            answers = [rowInSourceFile[numberOfRow], rowInSourceFile[numberOfRow + 1], rowInSourceFile[numberOfRow + 2], rowInSourceFile[numberOfRow + 3]];
            correctAnswer = answers[0]
            document.querySelector('.app__question').textContent = selectedQuestion;

            orderAnswersRandomly();        
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
    };
};

function orderAnswersRandomly() {
    for (let i = 0;  i < FREE_SPOTS.length; i++) {
        let assignedAnswerIndex = Math.floor(Math.random() * (answers.length));
        document.querySelector(`.app__answer--` + FREE_SPOTS[i]).textContent = answers[assignedAnswerIndex];
        answers.splice(assignedAnswerIndex, 1);
    };
};

let appAnswers = document.querySelectorAll(".app__answers");

for (let appAnswer of appAnswers) {
    appAnswer.addEventListener("click", function() {
        if (appAnswer.textContent === correctAnswer) {
            console.log('[SHOULD DISPLAY CORRECT]--->', appAnswer.textContent)
            soundCorrect.play();

            if (!isLearn) {
                counterCorrectTestQuestions++;
                displayQuestion();                        
            }
        } else {
            console.log('[SHOULD DISPLAY WRONG] --->', appAnswer.textContent);
            soundWrong.play();

            if (!isLearn) {
                displayQuestion();                        
            };
        };
    });
};

let modes = document.querySelectorAll('.app__modes');

for (let mode of modes) {    
    mode.addEventListener("click", function() {
        cleanContent();

        if (mode.classList.contains('app__mode--test')) {
            console.log('selected TEST MODE');
            isLearn = false;

            resetCounters();
            
        } else {
            console.log('selected LEARN MODE');
            isLearn = true;
            document.getElementById('tryAgain').classList.add('hidden');
            document.querySelector('.app__score').textContent = ''
            document.getElementById('generateQuestionButton').textContent = 'Start'; 
        };
    });
};

function cleanContent() {
    document.querySelector('.app__question').textContent = '';

    for (let i = 1; i <= FREE_SPOTS.length; i++) {
        document.querySelector('.app__answer--' + i).textContent = '';
    };
};

function resetCounters() {
    counterCorrectTestQuestions = 0;
    counterAllTestQuestions = 0;
    console.log('Counters reset:', counterCorrectTestQuestions, counterAllTestQuestions);
    document.querySelector('.app__score').textContent = '';
    document.querySelector('.app__test-summary').textContent = '';
    document.getElementById('generateQuestionButton').textContent = 'Start';
    document.getElementById('tryAgain').classList.add('hidden');            
};

function takeTestAgain() {
    console.log(`You're taking test again`);
    resetCounters();
    document.getElementById('generateQuestionButton').classList.remove('hidden');
    cleanContent();      
};
