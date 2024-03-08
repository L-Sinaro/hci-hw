const startupScreen = document.getElementById('startupScreen');
const gameScreen = document.getElementById('gameScreen');
const completionScreen = document.getElementById('completionScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const nextDifficultyButton = document.getElementById('nextDifficultyButton');
const difficultyButtons = document.querySelectorAll('.difficultyButton');
const square1 = document.getElementById('square1');
const square2 = document.getElementById('square2');
const result = document.getElementById('result');

// New "Start Session" button creation and addition
startSessionButton.innerText = 'Start Session';
startSessionButton.id = 'startSessionButton';
// Insert the "Start Session" button before the "Start Game" button within the startup screen
startupScreen.insertBefore(startSessionButton, startButton);

let startTime;
let times = [];
let selectedDifficulty = 1;
let sessionTimes = []; // Array to store times for each session
let recording_status = 1

function showScreen(screen) {
    startupScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    completionScreen.style.display = 'none';
    screen.style.display = 'flex';
}

function adjustDifficulty(level) {
    selectedDifficulty = parseInt(level, 10);
    let size = 150;
    let distance = 20;
    if (level % 2 === 0) {
        distance = 200 + level * 200;
        size = 150 - (level - 1) * 20;
    } else {
        distance = 200 + (level - 1) * 200;
        size = 150 - level * 20;
    }

    square1.style.width = square2.style.width = `${size}px`;
    square1.style.height = square2.style.height = `${size}px`;
    square1.style.marginRight = `${distance}px`;
    square2.style.marginRight = `-${distance}px`;
}

function highlightSelectedButton() {
    difficultyButtons.forEach(button => {
        if (parseInt(button.getAttribute('data-difficulty'), 10) === selectedDifficulty) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

function handleCompletion() {
    let averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    sessionTimes.push(averageTime); // Store the average time of the current difficulty
    if (selectedDifficulty === 6) {
        let overallAverage = sessionTimes.reduce((a, b) => a + b, 0) / sessionTimes.length;
        result.textContent += ` Overall average time: ${overallAverage.toFixed(2)} ms`;
        sessionTimes = []; // Reset session times for a new session
    } else {
        result.textContent = `Average time per pair of clicks: ${averageTime.toFixed(2)} ms`;
    }
    showScreen(completionScreen);
    if (selectedDifficulty < 6) {
        nextDifficultyButton.style.display = 'inline-block';
    } else {
        nextDifficultyButton.style.display = 'none';
        selectedDifficulty = 0; // Reset difficulty for new session
    }
}

difficultyButtons.forEach(button => {
    button.addEventListener('click', function() {
        adjustDifficulty(this.getAttribute('data-difficulty'));
        highlightSelectedButton();
    });
});

startButton.addEventListener('click', function() {
    showScreen(gameScreen);
});

startSessionButton.addEventListener('click', function() {
    adjustDifficulty(1); // Automatically start from difficulty 1
    highlightSelectedButton();
    initialize();
    showScreen(gameScreen);
});

restartButton.addEventListener('click', function() {
    initialize();
    sessionTimes = [];
    showScreen(startupScreen);
    highlightSelectedButton();
});

nextDifficultyButton.addEventListener('click', function() {
    if (selectedDifficulty < 6) {
        adjustDifficulty(++selectedDifficulty);
        highlightSelectedButton();
        initialize();
        showScreen(gameScreen);
        startTime = new Date();
    }
});

function initialize() {
    recording_status = 0;
    times = [];
}

function squareClicked() {
    if (recording_status === 0) {
        startTime = new Date();
        recording_status = 1
    }
    else {
        let endTime = new Date();
        let timeTaken = endTime - startTime;
        times.push(timeTaken);
        startTime = new Date();
    }
    if (times.length === 10) {
        handleCompletion();
    }
}

square1.addEventListener('click', squareClicked);
square2.addEventListener('click', squareClicked);
