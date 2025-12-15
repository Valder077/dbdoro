const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-button");
const startIcon = document.getElementById("starticon");
const restartBtn = document.getElementById("restart-button");
const backBtn = document.getElementById("back-button");
const sessionInfo = document.getElementById("session-info");
const boat = document.getElementById("boat");
const circle = document.querySelector(".progress-ring__progress"); // Pomodoro ring

const urlParams = new URLSearchParams(window.location.search);
let timeLeft = parseInt(urlParams.get("time")) || 1500; // default 25 min if not set
let totalTime = timeLeft;

let timerInterval = null;
let isRunning = false;

// Initialize display
timerDisplay.textContent = formatTime(timeLeft);
circle.style.strokeDasharray = 628; // same as CSS
circle.style.strokeDashoffset = 628; // start empty

// Format seconds as mm:ss
function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
}

// Move the boat across screen
function updateBoat() {
    const progress = (1 - timeLeft / totalTime) * 100;
    boat.style.transform = `translateX(${progress}%)`;
}

// Update the Pomodoro ring
function updateRing() {
    const progress = 628 * (timeLeft / totalTime); // 628 = stroke-dasharray
    circle.style.strokeDashoffset = progress;
}

// ⭐ START/PAUSE TOGGLE ⭐
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        // Start timer
        isRunning = true;
        startIcon.src = "pause.png";  // change icon

        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startIcon.src = "start.png";  // reset icon
                return;
            }

            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            updateBoat();
            updateRing(); // update the ring
        }, 1000);

    } else {
        // Pause timer
        clearInterval(timerInterval);
        isRunning = false;
        startIcon.src = "start.png"; // change icon back
    }
});

// Restart button
restartBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    timerDisplay.textContent = formatTime(timeLeft);
    boat.style.transform = "translateX(0)";
    circle.style.strokeDashoffset = 628; // reset ring
    isRunning = false;

    // reset icon
    startIcon.src = "start.png";
});

// Back button
backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});
