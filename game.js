const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questioCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which two teams are playing in this year's NBA Finals?",
        choice1: "Golden State & Boston",
        choice2: "New York & Los Angeles",
        choice3: "Miami & Dallas",
        choice4: "Orlando & Mars",
        answer: 1
    },
    {
        question: "Which two teams are playing in this year's NHL Finals?",
        choice1: "Montreal & Boston",
        choice2: "New York & Edmonton",
        choice3: "Tampa Bay & Colorado",
        choice4: "San Jose & Mars",
        answer: 3
    },
    {
        question: "Which two teams played in this year's Super Bowl?",
        choice1: "Tampa Bay & Kansas City",
        choice2: "Los Angeles & Cincinnati",
        choice3: "Miami & Dallas",
        choice4: "Atlanta & Mars",
        answer: 2
    },
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questioCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
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
        console.log(selectedAnswer);
        getNewQuestion();
    });
});

startGame();