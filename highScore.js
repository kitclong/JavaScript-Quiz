//Set global variables
let scoresListArea = document.querySelector('#scoresListArea');

// ===============================================================================================
//Display score to highscore page
let storedScores = JSON.parse(localStorage.getItem('userData')); //Retrieve data from local storage and sets variable

function displayScores() {
    if (storedScores !== null) {
        let scoreList = document.createElement('ol'); //Create list
        scoreList.className = 'scoreListClass';

        for (let i = 0; i < storedScores.length; i++) {
            let initials = storedScores[i].personInitials;
            let scores = storedScores[i].userScore;
            let scoreEntry = document.createElement('li'); //Creates list for highscore items
            scoreEntry.innerHTML = initials + ' - ' + scores;
            scoreList.appendChild(scoreEntry);
        }
        scoresListArea.appendChild(scoreList);
    }
};
displayScores();

// ===============================================================================================
//Buttons to clear or restart
let backButton = document.querySelector('#backButton');
backButton.addEventListener('click', function () {
    location.href = 'index.html'; //goes back to quiz to run again
});

let clearButton = document.querySelector('#clearScores');
clearButton.addEventListener('click', function () {
    window.localStorage.clear(); //clears highscore list from local storage
    scoresListArea.innerHTML = '';
});
