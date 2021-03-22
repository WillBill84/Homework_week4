//declare html elements and variables
var startBtn = document.querySelector('#start-quiz-button');
var quizFirstPage = document.querySelector('.quiz-start');
var quizQuestionsPage = document.querySelector('.quiz-questions');
var questionHeader = document.querySelector("#question-header");
var answerButtons = document.getElementsByClassName('answerButtons');
var timerDiv = document.querySelector('.timer');
var timerCount =  document.querySelector("#timer-count");
var answerText = document.querySelector('#answertext');
var gameOverPanel = document.querySelector('.game-over');
var GameOverbtn = document.querySelector('#gameoverbtn');
var scoreText = document.querySelector('#scoreNumber');
var submitButton = document.querySelector('#submit-button');
var scoreLink = document.querySelector('.scorelink');
var playerScorePanel = document.querySelector('.playerscorepanel');
var resetScore = document.querySelector('#resetscorebtn');
var scoreContainer = document.querySelector('.scorecontainer');
var scoreMessage = document.querySelector('.scoremessage');
var timer;
var timeLeft = 0;
var questionIndex = 0
var score = 0;
var scoreList = [];
var letters = /^[A-Za-z]+$/;

// Questions array with objects
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        buttons: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        buttons: ["1. <js>", "2. <javascript>", "3. <scripting>", "4. <script>"],
        answer: "4. <script>"
    },

    {
        question: "Which operator is used to assign a value to a variable?",
        buttons: ["+", "-", "==", "="],
        answer: "="
    },

    {
        question: "How do you write an IF statement in JavaScript?",
        buttons: ["if i = 5", "if i = 5 then", "if (i == 5)", "if i == 5 then"],
        answer: "if (i == 5)"
    },

    {
        question: "How does a FOR loop start?",
        buttons: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i ++)", "for i = 1 to 5", "for (i <= 5; i++)"],
        answer: "for (i = 0; i <= 5; i ++)"
    },

    {
        question: "How do you round the number 7.25, to the nearest integer?",
        buttons: ["round(7.25)", "rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25)"],
        answer: "Math.round(7.25)"
    }
   
];

/* console.log(questions.length); */


// click start quiz button load start quiz function
startBtn.addEventListener('click', startQuiz);

// run the quiz and start the timer
function startQuiz () {
    timer (); 
// hide and show first page with questions pages
    quizFirstPage.style.display = 'none';
    quizQuestionsPage.style.display = 'block';
// load the questions
    loadQuestions ();

};





// Timer function
function timer () {
    // amount of time on the clock
    timeLeft = 75;
    // shows timer and writes the counter to the html element
    timerDiv.style.display = 'block';
    timerCount.innerHTML = timeLeft;
    // decrement timer and write to html element
    timer = setInterval(function() {
        timeLeft--;
        timerCount.innerHTML = timeLeft;
        
    // if timer reaches 0, stop timer and run the gameover function

        if (timeLeft <= 0) {
            clearInterval(timer);
            
            gameOver();
        }
    }, 1000);
    
};





// Question list and answer button assignment
function loadQuestions () {

    // load each question to title
    questionHeader.textContent = questions[questionIndex].question;

// load each questions multiple choice answers to each button using index's
    answerButtons[0].textContent = questions[questionIndex].buttons[0];
    answerButtons[1].textContent = questions[questionIndex].buttons[1];
    answerButtons[2].textContent = questions[questionIndex].buttons[2];
    answerButtons[3].textContent = questions[questionIndex].buttons[3];


    // loop through answer buttons to add click functions
    for (i = 0; i < answerButtons.length; i++) {

        // click any answer button run checkanswer function and the click nect function
        answerButtons[i].addEventListener('click', checkAnswer);
        answerButtons[i].addEventListener('click', clickNext);



    }

};



// if question index is less then 5 increment and load through questions. else call gameover 
var clickNext = function () {
    
        // update question index number to match how many questions you have
    if  (questionIndex < 5) {
        questionIndex ++; 
        loadQuestions();
        console.log(questionIndex)

    }
    else {
        gameOver();
    }
   

};
  




// checks answer buttons against question answer
    function checkAnswer(event) {

    // if selection is correct displays correct message increases score and questionIndex 
    if (event.target.textContent === questions[questionIndex].answer) {
        answerText.style.opacity = '1';
        answerText.style.color = '#198754';
        answerText.textContent = 'Correct!';
        score ++;

        

     // hide answerText after shown
        setTimeout(function() {
            answerText.style.opacity = '0';
        }, 800);



    }
        
    // if user selects incorect answer 
      else {
        answerText.style.opacity = '1';
        answerText.style.color = '#dc3545';
        answerText.textContent = 'Wrong!';


        // hide answerText after shown
        setTimeout(function() {
            answerText.style.opacity = '0';
        }, 800);


        // deduct 10 seconds from timer
        timeLeft -= 10;
        timerCount.textContent = timeLeft;


        }

    



    };








function gameOver() {
    // hide/show html, stop timer and display score.
    quizQuestionsPage.style.display = 'none';
    gameOverPanel.style.display = 'block';
    clearInterval(timer);

    //add the remainding time and correct answers and add to page
    scoreText.textContent = score + timeLeft;
   
    //submit button loads the store score function
    submitButton.addEventListener('click', storePlayerScore);

};




function storePlayerScore(event) {

 
    // stop default action of input
    event.preventDefault();

    // if initals entered are 1 or 0 charatures show an alert and end function
    if (initials.value.length <= 1) {

    alert("Please enter your initials");
    return
     } 

     // if not letters show alert.
     if (!initials.value.match(letters)) {
      
      alert("Your initials must only contain letters");
      return
      }


    else {

    newScore = {
        // takes the initials input and removes any whitespace
        userName: initials.value.trim(),
        // convert initials to uppercase
        userName: initials.value.toUpperCase(),
        // user score is number of correct answers plus remaining time
        userScore: score + timeLeft
    };
        //push a new score on to the end of the scores
        scoreList.push(newScore);

    // sorts scores from highest to lowest
    scoreList.sort((a, b) => b.userScore - a.userScore);
    //adds score to the local storage 
    localStorage.setItem('score', JSON.stringify(scoreList));
    
    playerScores();

    }
    
};




function loadScores() {
    // retrieve stored scores from localstorage
    storedScores = JSON.parse(localStorage.getItem('score'));

    // if no scores in storage return empty
    if (storedScores !== null) {
        scoreList = storedScores;

    return scoreList;

    }


};


function playerScores() {
    // show/hide html
    quizFirstPage.style.display = 'none';
    quizQuestionsPage.style.display = 'none';
    gameOverPanel.style.display = 'none';
     scoreLink.style.display = 'none';
    
    // stop timer and hide html
    clearInterval(timer);
    timerDiv.style.display = 'none';

    // show html and  run load scores function
    playerScorePanel.style.display = 'block';
    loadScores()

    // show message if no scores
    scoreMessage.style.display = 'block';



//loop to increment scorelist 
    for (i = 0; i < scoreList.length; i++) {

        //adds user name and user score to scorelist
        var score = scoreList[i].userName + ' : ' + scoreList[i].userScore;
        // create html element for player scores
        var newPlayerScore = document.createElement("p");

        //load score into new html element
        newPlayerScore.innerHTML = score;
        //add the new p tag to the page
        scoreContainer.appendChild(newPlayerScore);

        // hide the no scores message
        scoreMessage.style.display = 'none';
    
    }



    // click reset button to clear scores and display no score message

        resetScore.addEventListener('click', function() {
        scoreMessage.style.display = 'block';
        localStorage.clear();
        scoreContainer.innerHTML = '';

       
    });


};






// click viewscore link show player score page and load scores
scoreLink.addEventListener('click', playerScores);
loadScores();