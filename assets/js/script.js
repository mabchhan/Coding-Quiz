var timerEl = document.getElementById("countdown");
var startBtn = document.getElementById("start-btn");
var mainEl = document.querySelector(".main");
var questionSectionEl = document.querySelector(".question-section");
var questionTitleEl = document.querySelector(".question-title");
var listAnswersEl = document.querySelector(".list-answers");
var btnAnswer = document.querySelector(".btn-answer");
var scoreEl = document.getElementById("score");
var formDoneEl = document.getElementById("form-done");
var highscoreEl = document.getElementById("highscore-section");
var submitBtn = document.getElementById("submit");
var inputEl = document.getElementById("input-name");
var displayhighscoreEl = document.getElementById("display-highscore");
var gobackBtn = document.getElementById("go-back");
var clearscoreEl = document.getElementById("clear-score");
var viewHighScoreEl = document.getElementById("view-highscore");

var timeLeft = 60;
var currentQuestionIndex = 0;
var highScore = {
  name: "",
  score: 0,
};

var currentScore = 0;
var finishAnswer = false;

// function timer
function setTime() {
  // sets interval in variable
  var timerInterval = setInterval(function () {
    timeLeft--;

    if (timeLeft < 0) {
      timeLeft = 0;
    }

    timerEl.textContent = timeLeft;
    if (timeLeft === 0 || finishAnswer === true) {
      questionSectionEl.classList.add("hidden");
      clearInterval(timerInterval);
      formDoneEl.classList.remove("hidden");
      // scoreEl.textContent = "Your final score: " + timeLeft;
      scoreEl.textContent = "Your final score: " + currentScore;
    }
  }, 1000);
}

// view high score link

viewHighScoreEl.addEventListener("click", function () {
  mainEl.classList.add("hidden");
  highscoreEl.classList.remove("hidden");
  viewHighscore();
});

// clear high score in local storage
clearscoreEl.addEventListener("click", function () {
  highScore = {
    name: "",
    score: 0,
  };
  localStorage.removeItem("highScore");
});

// go back button
gobackBtn.addEventListener("click", function () {
  mainEl.classList.remove("hidden");
  highscoreEl.classList.add("hidden");
  timeLeft = 60;
  timerEl.textContent = timeLeft;
  currentQuestionIndex = 0;
  finishAnswer = false;
  currentScore = 0;
});

// submit button
submitBtn.addEventListener("click", function () {
  // if (highScore.score < timeLeft || highScore.score === 0) {
  //   highScore = {
  //     name: inputEl.value,
  //     score: currentScore,
  //   };
  //   localStorage.setItem("highScore", JSON.stringify(highScore));
  // }
  if (inputEl.value === "") {
    alert("Please initial your name.");
    return;
  }

  formDoneEl.classList.add("hidden");
  highscoreEl.classList.remove("hidden");
  highScore = {
    name: inputEl.value,
    score: currentScore,
  };
  localStorage.setItem("highScore", JSON.stringify(highScore));

  displayhighscoreEl.textContent =
    "1. " + highScore.name + " " + highScore.score;
  inputEl.value = "";

  console.log(inputEl.textContent);
});

// function view high score
function viewHighscore() {
  var lastHighScore = JSON.parse(localStorage.getItem("highScore"));
  if (lastHighScore !== null) {
    highScore = lastHighScore;
  }
  displayhighscoreEl.textContent =
    "Name: " + highScore.name + " " + highScore.score;
}

// when we click on start quiz button
startBtn.addEventListener("click", function () {
  // remove previous question
  while (listAnswersEl.firstChild) {
    listAnswersEl.removeChild(listAnswersEl.lastChild);
  }
  setTime();
  mainEl.classList.add("hidden");
  questionSectionEl.classList.remove("hidden");
  showQuestion();

  // load previous high score
  viewHighscore();

  // var lastHighScore = JSON.parse(localStorage.getItem("highScore"));
  // if (lastHighScore !== null) {
  //   highScore = lastHighScore;
  // }
});

// for show question
function showQuestion() {
  row = 1;

  questionTitleEl.innerHTML = questions[currentQuestionIndex].question;

  questions[currentQuestionIndex].answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = row + ". " + answer.text;
    button.classList.add("btn-answer");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    listAnswersEl.appendChild(button);

    row++;
    // console.log(answer.text);
  });
}

// when we click on each answer
document.addEventListener("click", function (e) {
  // var createElementP = document.createElement("p");
  // var lineElement = document.createElement("hr");

  if (e.target && e.target.classList == "btn-answer") {
    const selectedButton = e.target;

    // console.log(selectedButton.dataset.correct);

    // when we click right answer

    if (selectedButton.dataset.correct) {
      currentQuestionIndex++;
      currentScore += 5;
      // remove all previous question
      while (listAnswersEl.firstChild) {
        listAnswersEl.removeChild(listAnswersEl.lastChild);
      }

      console.log(currentQuestionIndex + " " + questions.length);

      if (currentQuestionIndex >= questions.length) {
        finishAnswer = true;
      } else {
        showQuestion();
      }
    } else {
      timeLeft -= 10;
      // questionSectionEl.appendChild(lineElement);
      // questionSectionEl.appendChild(createElementP).textContent = "Wrong !";
    }
  }
});

// variable for store questions
var questions = [
  {
    question: "What is 2 + 2 ?",
    answers: [
      { text: "Answer is: 1", correct: false },
      { text: "Answer is: 2", correct: false },
      { text: "Answer is: 3", correct: false },
      { text: "Answer is: 4", correct: true },
    ],
  },
  {
    question: "What company make iPhone?",
    answers: [
      { text: "Apple", correct: true },
      { text: "Samsung", correct: false },
      { text: "Motorola", correct: false },
      { text: "HTC", correct: false },
    ],
  },
  {
    question: "What is 3*3?",
    answers: [
      { text: "1", correct: false },
      { text: "6", correct: false },
      { text: "3", correct: false },
      { text: "9", correct: true },
    ],
  },
  {
    question: "What is the richest man in the world?",
    answers: [
      { text: "Elone Mask", correct: true },
      { text: "John", correct: false },
      { text: "Bill Gate", correct: false },
      { text: "Jame", correct: false },
    ],
  },
  {
    question: "React is?",
    answers: [
      { text: "Front-End", correct: true },
      { text: "Back-End", correct: false },
      { text: "Database", correct: false },
      { text: "Server", correct: false },
    ],
  },
];
