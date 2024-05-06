let isLearn;
let question;

function createQuestionLearn() {
  question = new QuestionLearnMode();
}

function createQuestionTest() {
  question = new QuestionTestMode();
}

document.querySelector('.app__mode--learn').addEventListener('click', function() {
  isLearn = true;
  console.log('isLearn=', isLearn);
  document.getElementById('generateQuestionButton').removeEventListener('click', createQuestionTest);
  document.getElementById('generateQuestionButton').addEventListener('click', createQuestionLearn);
  console.log('learn mode');
});

document.querySelector('.app__mode--test').addEventListener('click', function() {
  isLearn = false;
  console.log('isLearn=', isLearn);
  document.getElementById('generateQuestionButton').removeEventListener('click', createQuestionLearn);
  document.getElementById('generateQuestionButton').addEventListener('click', createQuestionTest);
  console.log('test mode');
});

class QuestionLearnMode {
  constructor() {
    console.log('utworzono obiekt z klasy QL');
  }
}

class QuestionTestMode extends QuestionLearnMode {
  constructor() {
    super();
    console.log('utworzono obiekt z klasy QT');
  }
}
