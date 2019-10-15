//question database
const STORE = [
  {
    question: "What is Young Thug's full legal name?",
    answers: [
      'Jeffery Lamar Williams',
      'Jeffery Pharoah Williams',
      'Jeffery Andre Roberts',
      'Jeffery Stephaen Roberts'
    ],
    correctAnswer:
      'Jeffery Lamar Williams'
  },
  {
    question:
      'How many biological children does Young Thug have?',
    answers: [
      '5',
      '0',
      '1',
      '6'
    ],
    correctAnswer:
      '6'
  },
  {
    question:
      "What was Young Thug's debut, full-length studio album release titled?",
    answers: [
      'I Came From Nothing',
      'Jeffery',
      'Barter 6',
      'So Much Fun'
    ],
    correctAnswer: 'So Much Fun'
  },
  {
    question: "What is Young Thug's highest US Billboard charting single as a lead artist?",
    answers: [
      'Best Friend',
      'Goodbyes',
      'The London',
      'Pick Up The Phone'
    ],
    correctAnswer: 'The London'
  },
  {
    question:
      "What does YSL stand for in regards to Young Thug's personal label?",
    answers: [
      'Young Slime Love',
      'Young Stoner Life',
      'Youth Slime Language',
      'Young Stoner Love'
    ],
    correctAnswer:
      'Young Stoner Life'
  },
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.jungleBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer...</h3>
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.jungleBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job!',
    'You sure know a lot about Thugger!'
  ];

  const good = [
    'Good, not great.',
    'You should go listen to Slime Season 3...'
  ];

  const bad = [
    'Do you even know who Young Thug is?',
    'Or are you more of a Taylor Swift person?'
  ];

  if (score >= 4) {
    array = great;
  } else if (score < 4 && score >= 2) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
        <h3>Your score is ${score} / 5</h3>
        <p class="sizeMe">${array[1]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.jungleBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
