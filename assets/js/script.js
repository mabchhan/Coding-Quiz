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

var timeLeft = 40;
currentQuestionIndex = 0;
var highScore = {
  name: "",
  score: 0,
};

var finishAnswer = false;

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
      scoreEl.textContent = "Your final score: " + timeLeft;
    }
  }, 1000);
}
clearscoreEl.addEventListener("click", function () {
  highScore = {
    name: "",
    score: 0,
  };
  localStorage.removeItem("highScore");
});

gobackBtn.addEventListener("click", function () {
  mainEl.classList.remove("hidden");
  highscoreEl.classList.add("hidden");
  timeLeft = 40;
  timerEl.textContent = timeLeft;
  currentQuestionIndex = 0;
  finishAnswer = false;
});

submitBtn.addEventListener("click", function () {
  formDoneEl.classList.add("hidden");
  highscoreEl.classList.remove("hidden");
  console.log(highScore.score);
  if (highScore.score < timeLeft || highScore.score === 0) {
    highScore = {
      name: inputEl.value,
      score: timeLeft,
    };
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }
  displayhighscoreEl.textContent =
    "1. " + highScore.name + " " + highScore.score;
  inputEl.value = "";
  console.log(highScore);
});

startBtn.addEventListener("click", function () {
  while (listAnswersEl.firstChild) {
    listAnswersEl.removeChild(listAnswersEl.lastChild);
  }
  setTime();
  mainEl.classList.add("hidden");
  questionSectionEl.classList.remove("hidden");
  showQuestion();

  var lastGrade = JSON.parse(localStorage.getItem("highScore"));
  if (lastGrade !== null) {
    highScore = lastGrade;
  }

  // while (listAnswersEl.firstChild) {
  //   listAnswersEl.removeChild(listAnswersEl.lastChild);
  // }
});

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
    //button.addEventListener("click", selectAnswer);
    listAnswersEl.appendChild(button);

    row++;
    console.log(answer.text);
  });
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList == "btn-answer") {
    const selectedButton = e.target;

    console.log(selectedButton.dataset.correct);

    if (selectedButton.dataset.correct) {
      currentQuestionIndex++;

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
      // if (timeLeft < 0) timeLeft = 0;
    }
  }
});

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
      { text: "Frontend", correct: true },
      { text: "Backend", correct: false },
      { text: "Database", correct: false },
      { text: "Server", correct: false },
    ],
  },
];

// showQuestion(questions);
