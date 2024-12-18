let startTime1 = 5 * 60;
let startTime2 = 5 * 60;
let increment1 = 0;
let increment2 = 0;

let time1 = startTime1;
let time2 = startTime2;

let timerInterval;
let activePlayer = null;

const timeDisplay1 = document.getElementById('time1');
const timeDisplay2 = document.getElementById('time2');
const player1Clock = document.getElementById('player1');
const player2Clock = document.getElementById('player2');

const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeModal = document.getElementById('close-modal');
const settingsForm = document.getElementById('settings-form');

function formatTime(seconds) {
    seconds = Math.max(0, seconds); // Prevent negative values

    // Decide how many decimal places to display (e.g., 1 or 2)
    const displayPrecision = 2; // Number of decimal places to display
    const factor = Math.pow(10, displayPrecision);

    // Round seconds to the desired precision without affecting internal value
    const roundedSeconds = Math.round(seconds * factor) / factor;

    const min = Math.floor(roundedSeconds / 60);
    const sec = Math.floor(roundedSeconds % 60);
    const decimalPart = Math.floor((roundedSeconds - min * 60 - sec) * factor);

    // Format the decimal part with leading zeros if necessary
    const decimalStr = String(decimalPart).padStart(displayPrecision, '0');

    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${decimalStr}`;
}

function updateDisplays() {
    timeDisplay1.textContent = formatTime(time1);
    timeDisplay2.textContent = formatTime(time2);
}

function switchPlayer() {
    clearInterval(timerInterval);

    if (activePlayer === 'player1') {
        time1 += increment1;
        updateDisplays(); // Update the display immediately
        activePlayer = 'player2';
        player1Clock.classList.remove('active');
        player2Clock.classList.add('active');
    } else {
        time2 += increment2;
        updateDisplays(); // Update the display immediately
        activePlayer = 'player1';
        player2Clock.classList.remove('active');
        player1Clock.classList.add('active');
    }

    timerInterval = setInterval(countDown, countdownInterval); // Use the correct interval
}

const countdownInterval = 10; // Interval in milliseconds
const decrement = countdownInterval / 1000; // Decrement in seconds (e.g., 0.1 for 100ms)

function countDown() {
    if (activePlayer === 'player1') {
        time1 -= decrement;
        if (time1 <= 0) {
            clearInterval(timerInterval);
            time1 = 0;
            updateDisplays();
            alert("Player 1's time is up!");
            return;
        }
    } else if (activePlayer === 'player2') {
        time2 -= decrement;
        if (time2 <= 0) {
            clearInterval(timerInterval);
            time2 = 0;
            updateDisplays();
            alert("Player 2's time is up!");
            return;
        }
    }
    updateDisplays();
}

function startClock(e) {
    const clickedPlayer = e.currentTarget.id;

    if (activePlayer === null) {
        // Game hasn't started yet
        if (clickedPlayer === 'player1') {
            activePlayer = 'player2';
            player2Clock.classList.add('active');
        } else {
            activePlayer = 'player1';
            player1Clock.classList.add('active');
        }
        timerInterval = setInterval(countDown, countdownInterval); // Corrected interval
        switchPlayer(); // Start the clock for the first active player
    } else if (activePlayer === clickedPlayer) {
        // Only switch turns if the running clock is pressed
        switchPlayer();
    }
    // Do nothing if the stopped clock is pressed
}

player1Clock.addEventListener('click', startClock);
player2Clock.addEventListener('click', startClock);

settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

window.onclick = function(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
}

settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    startTime1 = parseFloat(document.getElementById('start-time1').value) * 60;
    startTime2 = parseFloat(document.getElementById('start-time2').value) * 60;
    increment1 = parseFloat(document.getElementById('increment1').value);
    increment2 = parseFloat(document.getElementById('increment2').value);

    time1 = startTime1;
    time2 = startTime2;
    updateDisplays();

    clearInterval(timerInterval);
    activePlayer = null;
    player1Clock.classList.remove('active');
    player2Clock.classList.remove('active');

    settingsModal.style.display = 'none';
});

updateDisplays();