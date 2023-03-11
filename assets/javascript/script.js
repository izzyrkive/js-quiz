var questions = [
    {
        question: "JavaScript statements are composed of:",
        options: ["Values, Operators, Expressions, All of the above"],
        answer: "All of the above"
    },

    {
        question: "Which of the following is not a correct way to declare a JavaScript variable?",
        options: ["var, total, let, const"],
        answer: "total"
    },

    {
        question: "Which of the following is not a JavaScript operator?",
        options: ["Artithmetic Operators, Comparison Operators, Functional Operators, Conditional Operators"],
        answer: "Functional Operators"
    },

    {
        question: "A JavaScript object datatype can contain:",
        options: ["An object, an array, a date, All of the above"],
        answer: "All of the above"
    },

    {
        question: "A Boolean datatype can only have two values.",
        options: ["True, False"],
        answer: "True"
    },

    {
        question: "Which conditional statement is used to specify a new condition to test if the first condition is false?",
        options: ["else if, switch, if, else"],
        answer: "else if"
    },

    {
        question: "Array indexes begin with the number 1.",
        options: ["True, False"],
        answer: "False"
    },

    {
        question: "Which of the following variable types cannot be redeclared or reassigned?",
        options: ["var, let, const"],
        answer: "const"
    }
]

var nameEl = document.querySelector("#user-name");
var questionsEl = document.querySelector("#quiz-questions");
var choicesEl = document.querySelector("#options");
var timerEl = document.querySelector("#quiz-timer");
var startBtn = document.querySelector("#start-button");
var submitBtn = document.querySelector("#score-submit");

var timerId;
var currentQuestionIndex = 0;
var time = questions.length * 30;

// Function starts the quiz, hides the initial homepage, and populates the first question

function startQuiz() {
    timerId = setInterval(clockTick, 300);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("starting-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    showQuestion();
}

// Loops through the questions array by index and creates a list for each choice and answer

function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

// Uses the choicesEl to append questions text to HTML file

  var promptEl = document.getElementById("questions-text")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";

    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Upon selecting an answer, next question will populate

function questionClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      getQuestion();
    }
}

// Upon quiz ending, timer is stopped and questions are hidden

function endQuiz() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-quiz");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("user-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// Saves user's score and name to local storage

function saveScore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("high-scores")) || [];
      var newScore = {
        score: time,
        name: name
      };

// Pushes user's new score to local storage

      highscores.push(newScore);
      window.localStorage.setItem("high-scores", JSON.stringify(highscores));
    }
}

// Saves user's score on enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveScore();
    }
}

// Saves user's score on submit

submitBtn.onclick = saveScore;

startBtn.onclick = startQuiz;
