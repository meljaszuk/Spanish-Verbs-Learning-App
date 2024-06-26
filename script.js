'use strict';

const scopes = [
  { scopeName: 'scope-1', sourceFile: 'sources/source-1.txt', numberOfQuestions: 1000 },
  { scopeName: 'scope-2', sourceFile: 'sources/source-2.txt', numberOfQuestions: 1000 },
  { scopeName: 'scope-3', sourceFile: 'sources/source-3.txt', numberOfQuestions: 1000 },
  { scopeName: 'scope-4', sourceFile: 'sources/source-4.txt', numberOfQuestions: 1000 },
  { scopeName: 'scope-5', sourceFile: 'sources/source-5.txt', numberOfQuestions: 20 }
];

const ANSWERS_PER_QUESTION = 4;
const FREE_SPOTS = [1, 2, 3, 4];
const NUMBER_OF_TEST_QUESTIONS = 5;

let counterAllTestQuestions = 0;
let counterCorrectTestQuestions = 0;
let isLearn = true;
let url = scopes[4].sourceFile;
let numberOfQuestionsInSourceFile = scopes[4].numberOfQuestions;
const appScopes = document.querySelectorAll('.app__scope');

document.getElementById('generateQuestionButton').addEventListener('click', displayQuestion);
document.getElementById('tryAgain').addEventListener('click', takeTestAgain);
document.querySelectorAll('.app__answers').forEach(function(appAnswer) {
  appAnswer.addEventListener('mouseover', function() {
    if (appAnswer.classList.contains('mark-neutral')) {
      soundHover.play();
    }
  });
});

for (const appScope of appScopes) {
  appScope.addEventListener('click', function() {
    switch (true) {
      case (appScope.classList.contains('app__scope--1')):
        getReferences(1);
        markScopeClicked(1);
        break;
      case (appScope.classList.contains('app__scope--2')):
        getReferences(2);
        markScopeClicked(2);
        break;
      case (appScope.classList.contains('app__scope--3')):
        getReferences(3);
        markScopeClicked(3);
        break;
      case (appScope.classList.contains('app__scope--4')):
        getReferences(4);
        markScopeClicked(4);
        break;
      case (appScope.classList.contains('app__scope--5')):
        getReferences(5);
        markScopeClicked(5);
        break;
      default:
        break;
    };

    function getReferences(identifier) {
      console.log('selcted scope: ', identifier);
      url = scopes[identifier - 1].sourceFile;
      console.log('url: ', url);
      numberOfQuestionsInSourceFile = scopes[identifier - 1].numberOfQuestions;
    };
  });
};

let numberOfRow;
let selectedQuestion = '';
let answers = [];
let correctAnswer;
let rowInSourceFile;

function getNumberOfRowOfQuestion() {
  const multiplier = 1 + Math.floor(Math.random() * (numberOfQuestionsInSourceFile - 1));

  numberOfRow = 1 + (ANSWERS_PER_QUESTION + 1) * multiplier;
  console.log('Row with question:', numberOfRow);

  return numberOfRow;
};

function displayQuestion() {
  document.querySelectorAll('.app__answers').forEach(function(appAnswer) {
    appAnswer.classList.add('mark-neutral');
  });
  
  if (isLearn) {
    document.getElementById('generateQuestionButton').textContent = 'NEXT';
  }

  if (!isLearn) {
    counterAllTestQuestions++;
    document.querySelector('.app__score').textContent = counterCorrectTestQuestions + ' / ' + (counterAllTestQuestions - 1);

    if (counterAllTestQuestions > NUMBER_OF_TEST_QUESTIONS) {
      document.querySelector('.app__test-summary').textContent = `You've scored ` + Math.round((counterCorrectTestQuestions / (counterAllTestQuestions - 1)) * 100) + ' %.';
      cleanContent();
      document.querySelectorAll('.app__answers').forEach(function(appAnswer) {
        appAnswer.classList.remove('mark-neutral','mark-correct','mark-incorrect');
      });
    };
  };

  getNumberOfRowOfQuestion();

  if (isLearn || counterAllTestQuestions <= NUMBER_OF_TEST_QUESTIONS) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          console.log('error');
          throw new Error(`File can't be loaded.`);
        }

        return response.text();
      })
      .then(data => {
        rowInSourceFile = data.split('\n');
        selectedQuestion = rowInSourceFile[numberOfRow - 1];
        answers = [rowInSourceFile[numberOfRow], rowInSourceFile[numberOfRow + 1], rowInSourceFile[numberOfRow + 2], rowInSourceFile[numberOfRow + 3]];
        correctAnswer = answers[0];
        document.querySelector('.app__question').textContent = selectedQuestion;

        orderAnswersRandomly();
      })
      .catch(error => {
        console.error('Error occurred:', error);
    });
  };
};

function orderAnswersRandomly() {
  for (let i = 0; i < FREE_SPOTS.length; i++) {
    const assignedAnswerIndex = Math.floor(Math.random() * (answers.length));

    document.querySelector(`.app__answer--` + FREE_SPOTS[i]).textContent = answers[assignedAnswerIndex];
    answers.splice(assignedAnswerIndex, 1);
  };
};

const appAnswers = document.querySelectorAll('.app__answers');

for (const appAnswer of appAnswers) {
  appAnswer.addEventListener('click', function() {
    if (appAnswer.textContent === correctAnswer) {
      console.log('[SHOULD DISPLAY CORRECT]--->', appAnswer.textContent);
      appAnswer.classList.remove('mark-neutral','mark-incorrect');
      appAnswer.classList.add('mark-correct');
      soundCorrect.play();
      
      if (!isLearn) {
        counterCorrectTestQuestions++;
        setTimeout(displayQuestion,500);
      }
    } else {
      console.log('[SHOULD DISPLAY WRONG] --->', appAnswer.textContent);
      appAnswer.classList.remove('mark-neutral','mark-correct');
      appAnswer.classList.add('mark-incorrect');
      soundWrong.play();

      if (!isLearn) {
        setTimeout(displayQuestion,500);
      };
    };
  });
};

const modes = document.querySelectorAll('.app__modes');

for (const mode of modes) {
  mode.addEventListener('click', function() {
    cleanContent();
    resetCounters();

    if (mode.classList.contains('app__mode--test')) {
      console.log('selected TEST MODE');
      isLearn = false;
      displayQuestion();
      document.getElementById("tryAgain").classList.remove("hidden");
      document.getElementById("generateQuestionButton").classList.add("hidden");

    } else {
      console.log('selected LEARN MODE');
      isLearn = true;
      document.querySelector('.app__score').textContent = '';
      document.getElementById("generateQuestionButton").classList.remove("hidden");
      document.getElementById("tryAgain").classList.add("hidden");
      displayQuestion();
    };

    markModeClicked(isLearn);
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
};

function takeTestAgain() {
  console.log(`You're taking test again`);
  resetCounters();
  cleanContent();
  displayQuestion();
};

function markModeClicked(isLearn) {
  const modeLearn = document.getElementById('modeLearn');
  const modeTest = document.getElementById('modeTest');

  modeLearn.classList.toggle('mark-clicked', isLearn);
  modeLearn.classList.toggle('mark-unclicked', !isLearn);
  modeTest.classList.toggle('mark-clicked', !isLearn);
  modeTest.classList.toggle('mark-unclicked', isLearn);
}

function markScopeClicked(selectedScopeNumber) {
  document.querySelectorAll('.app__scope').forEach(scope => {
    scope.classList.toggle('mark-clicked', scope.classList.contains('app__scope--' + selectedScopeNumber));
    scope.classList.toggle('mark-unclicked', !scope.classList.contains('app__scope--' + selectedScopeNumber));
  });
}