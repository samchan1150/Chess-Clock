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
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
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

    timerInterval = setInterval(countDown, 1000);
}

function countDown() {
    if (activePlayer === 'player1') {
        time1--;
        if (time1 <= 0) {
            clearInterval(timerInterval);
            alert("Player 1's time is up!");
        }
    } else if (activePlayer === 'player2') {
        time2--;
        if (time2 <= 0) {
            clearInterval(timerInterval);
            alert("Player 2's time is up!");
        }
    }
    updateDisplays();
}

function startClock(e) {
    if (activePlayer === null) {
        if (e.currentTarget.id === 'player1') {
            activePlayer = 'player2';
            player2Clock.classList.add('active');
        } else {
            activePlayer = 'player1';
            player1Clock.classList.add('active');
        }
        timerInterval = setInterval(countDown, 1000);
    }
    switchPlayer();
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
    startTime1 = parseInt(document.getElementById('start-time1').value) * 60;
    startTime2 = parseInt(document.getElementById('start-time2').value) * 60;
    increment1 = parseInt(document.getElementById('increment1').value);
    increment2 = parseInt(document.getElementById('increment2').value);

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