const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const nextDifficultyButton = document.getElementById('nextDifficultyButton');
const difficultyButtons = document.querySelectorAll('.difficultyButton');
const square1 = document.getElementById('square1');
const square2 = document.getElementById('square2');
const startupScreen = document.getElementById('startupScreen');
const gameScreen = document.getElementById('gameScreen');
const completionScreen = document.getElementById('completionScreen');
const result = document.getElementById('result');

let startTime;
let clickCount = 0;
let times = [];
let selectedDifficulty = 1;

function showScreen(screen) {
    startupScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    completionScreen.style.display = 'none';
    screen.style.display = 'flex';
}

function adjustDifficulty(level) {
    let size = 150;
    let distance = 20;
    if (level % 2 === 0) {
        distance = 20 + level * 250;
        size = 150 - (level - 1) * 20;
    } else {
        distance = 20 + (level - 1) * 100;
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
    result.textContent = `Average time per pair of clicks: ${averageTime.toFixed(2)} ms`;
    showScreen(completionScreen);
    if (selectedDifficulty < 6) {
        nextDifficultyButton.style.display = 'inline-block';
    } else {
        nextDifficultyButton.style.display = 'none';
    }
}

difficultyButtons.forEach(button => {
    button.addEventListener('click', function() {
        adjustDifficulty(this.getAttribute('data-difficulty'));
    });
});

startButton.addEventListener('click', function() {
    showScreen(gameScreen);
    startTime = new Date();
});

restartButton.addEventListener('click', function() {
    times = [];
    clickCount = 0;
    showScreen(startupScreen);
});

nextDifficultyButton.addEventListener('click', function() {
    if (selectedDifficulty < 6) {
        adjustDifficulty(selectedDifficulty + 1);
        times = [];
        clickCount = 0;
        showScreen(gameScreen);
        startTime = new Date();
    }
});

function squareClicked() {
    clickCount++;
    if (clickCount % 2 === 0) {
        let endTime = new Date();
        let timeTaken = endTime - startTime;
        times.push(timeTaken);
        startTime = new Date();
        if (times.length === 10) {
            handleCompletion();
        }
    }
}

square1.addEventListener('click', squareClicked);
square2.addEventListener('click', squareClicked);
