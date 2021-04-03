// Set global variables, create array with questions/answers
let questions = [
    {
        title: 'Commonly used data types DO NOT include: _____.',
        choices: ['1) strings', '2) Booleans', '3) Alerts', '4) Numbers'],
        answer: '3) Alerts'
    },
    {
        title: 'The condition in an if/else statement is enclosed within: _____.',
        choices: ['1) Quotes', '2) Curly brackets', '3) Parentheses', '4) Square brackets'],
        answer: '3) Parentheses'
    },
    {
        title: 'Arrays in JavaScript can be used to store: _____.',
        choices: ['1) Numbers & Strings', '2) Other arrays', '3) Booleans', '4) All of the Above'],
        answer: '4) All of the Above'
    },
    {
        title: 'String values must be enclosed within _____ when being assigned to variables.',
        choices: ['1) Commas', '2) Curly Brackets', '3) Quotes', '4) Parentheses'],
        answer: '3) Quotes'
    },
    {
        title: 'A very useful tool used during development and debugging for printing content to the debugger is: _____.',
        choices: ['1) JavaScript', '2) Terminal/Bash', '3) Alerts', '4) Console.log'],
        answer: '4) Console.log'
    }
];

//quizTimer var
let score = 0;
let timeInterval = 0;
let secondsLeft = 75;
let timer = document.querySelector('#timer');


let storedScores = JSON.parse(localStorage.getItem('userData'));

//displayQuestions var
let instructionsText = document.querySelector('#instructions-text');
let startButton = document.querySelector('#start-button');
let timeCounter = document.querySelector('#time-counter');
let quizQuestions = document.querySelector('#quiz-questions');
let nextQuestions = undefined; //Set to undefined for use in startQuiz function
let currentIndex = 0;

//displayNextQuestion var
let titleItem = document.querySelector('#title-item');
let questionAnswers = document.querySelector('#question-answers');

let allScores = [];

// ===================================================================================================================================
//Create timer for quiz, stop when hits 0.
function quizTimer() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {  //setInterval method until clearInterval
            secondsLeft--;
            timer.innerText = secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(timeInterval); //clearInteral method called when timer hits 0 
                timer.innerText = 'Times Up!';
                setTimeout(function () {
                    endQuiz();
                }, 1250);  //set pause timer to show time out text before ending to highscore
            }
        }, 1000);
    }
}

// ===================================================================================================================================
//Create Starting function and event listener
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    instructionsText.classList.add("d-none");
    startButton.classList.add("d-none");
    timeCounter.classList.remove("d-none");
    quizQuestions.classList.remove("d-none");
    nextQuestions = questions[currentIndex];

    displayQuestion(nextQuestions);
    quizTimer();
}

// ===================================================================================================================================
//Create function to display questions/answers and bootstrap buttons for answer list 
function displayQuestion(question) {
    titleItem.innerText = question.title;
    question.choices.forEach(answerElement => { //for each answer make a button
        let button = document.createElement('button');
        button.className = 'btn btn-outline-secondary btn-block text-left'; //create boostrap button list with answers
        button.innerText = answerElement;
        questionAnswers.appendChild(button);
        button.addEventListener('click', displayNextQuestion);
    });
}

// ===================================================================================================================================
//Iterate through question list, print to page, and check
function displayNextQuestion(nextQuestion) {
    currentIndex++;
    if (currentIndex < questions.length) {
        checkCorrect(nextQuestion.target.innerText === nextQuestions.answer);
        questionAnswers.innerText = '';
        if (currentIndex < questions.length) {
            nextQuestions = questions[currentIndex];
            displayQuestion(nextQuestions);
        } else {
            currentIndex = 0
            displayQuestion(nextQuestions);
        }
    } else {
        endQuiz();
        // setTimeout(function () {
        //     endQuiz();
        // }, 1000);
    }
}

// ===================================================================================================================================
//Check answer selection and print to screen. Set timer penalty
function checkCorrect(checkResponse) {
    let alert = document.querySelector('#alertResult');
    if (checkResponse) {
        alert.innerText = ' ___________\n Good!';
    } else {
        alert.innerText = ' ___________\n Wrong!';
        secondsLeft = secondsLeft - 10; //set 10 sec penalty
        timer.innerText = secondsLeft;
    }
    setTimeout(function () {  //set timer to display good/wrong for selection and disappear
        alert.innerText = '';
    }, 1200);
}

// ===================================================================================================================================
//End quiz
function endQuiz() {
    timeCounter.classList.add('d-none');
    quizQuestions.classList.add('d-none');
    let addScore = document.querySelector('#add-score');
    addScore.classList.remove('d-none');
}

// ===================================================================================================================================
//Records user input data once submit button pressed
let buttonScore = document.querySelector('#button-score');
buttonScore.addEventListener('click', function () {
    let name = document.querySelector('#inputScore').value;
    scorePage(name, secondsLeft);
});

// Uses recorded/stored user data and push to display on highscore page 
function scorePage(theirInitials, theirScore) {
    let userData = {
        personInitials: theirInitials,
        userScore: theirScore
    };
    allScores.push(userData);
    localStorage.setItem('userData', JSON.stringify(allScores));
    location.href = "/highScore.html";
}

