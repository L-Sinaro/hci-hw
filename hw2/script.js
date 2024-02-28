const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
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
let selectedDifficulty = 1; // Default difficulty

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
        if (button.getAttribute('data-difficulty') === selectedDifficulty) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

difficultyButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectedDifficulty = this.getAttribute('data-difficulty');
        adjustDifficulty(selectedDifficulty);
        highlightSelectedButton(); // Highlight the selected button
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

function squareClicked() {
    clickCount++;
    if (clickCount % 2 === 0) {
        let endTime = new Date();
        let timeTaken = endTime - startTime;
        times.push(timeTaken);
        startTime = new Date();
        if (times.length === 10) {
            let averageTime = times.reduce((a, b) => a + b, 0) / times.length;
            result.textContent = `Average time per pair of clicks: ${averageTime.toFixed(2)} ms`;
            showScreen(completionScreen);
        }
    }
}

square1.addEventListener('click', squareClicked);
square2.addEventListener('click', squareClicked);

// Initially highlight the default selected difficulty button
highlightSelectedButton();
