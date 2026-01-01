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





function updateRing() {
    const progress = 628 * (timeLeft / totalTime); 
    circle.style.strokeDashoffset = progress;
}


startBtn.addEventListener("click", () => {
    if (!isRunning) {
        
        isRunning = true;
        startIcon.src = "pause.png";  

        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startIcon.src = "start.png";  
                return;
            }

            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            updateBoat();
            updateRing(); 
        }, 1000);

    } else {
        
        clearInterval(timerInterval);
        isRunning = false;
        startIcon.src = "start.png"; 
    }
});


restartBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    timerDisplay.textContent = formatTime(timeLeft);
    boat.style.transform = "translateX(0)";
    circle.style.strokeDashoffset = 628; 
    isRunning = false;

    
    startIcon.src = "start.png";
});


backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});
