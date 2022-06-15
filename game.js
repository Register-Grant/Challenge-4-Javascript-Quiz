const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document. getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which two teams are playing in this year's NBA Finals?",
        choice1: "Golden State & Boston",
        choice2: "New York & Los Angeles",
        choice3: "Miami & Dallas",
        choice4: "Orlando & Orlando",
        answer: 1
    },
    {
        question: "Which two teams are playing in this year's NHL Finals?",
        choice1: "Montreal & Boston",
        choice2: "New York & Edmonton",
        choice3: "Tampa Bay & Colorado",
        choice4: "San Jose & Minnesota",
        answer: 3
    },
    {
        question: "Which two teams played in this year's Super Bowl?",
        choice1: "Tampa Bay & Kansas City",
        choice2: "Los Angeles & Cincinnati",
        choice3: "Miami & Dallas",
        choice4: "Atlanta & New Orleans",
        answer: 2
    },
    {
        question: "Which two teams played in last year's World Series?",
        choice1: "St. Louis & Kansas City",
        choice2: "Thank goodness it wasn't the Red Sox",
        choice3: "Tampa Bay & Los Angeles",
        choice4: "Atlanta & Houston",
        answer: 4
    },
    {
        question: "Which four teams made it to this year's Final Four?",
        choice1: "Duke, UNC, Kansas, Villanova",
        choice2: "Duke, UNC, Kansas, Arizona",
        choice3: "UNC, Kansas, Villanova, Auburn",
        choice4: "Gators, Florida, UF, Florida Gators",
        answer: 1
    },
    {
        question: "Which two teams played in last year's College Football Championship Game?",
        choice1: "Florida & Miami",
        choice2: "Georgia & Oklahoma",
        choice3: "Alabama & Clemson",
        choice4: "Alabama & Georgia",
        answer: 4
    },
    {
        question: "Which state is clearly the best at sports?",
        choice1: "Florida",
        choice2: "New York",
        choice3: "California",
        choice4: "Texas",
        answer: 1
    },
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();