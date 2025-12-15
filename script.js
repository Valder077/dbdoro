const hoverSound = document.getElementById("hoverSound");
const clickSound = document.getElementById("clickSound");
const bgsound = document.getElementById("bgsound");
const muteButton = document.getElementById("mutebutton");
const muteIcon = document.getElementById("muteicon");

let isMuted = false;

document.addEventListener("click", () => {
    bgsound.muted = false;
    bgsound.play().catch(() => {});
}, { once: true });

muteButton.addEventListener("click", () => {
    isMuted = !isMuted;
    muteIcon.src = isMuted ? "mute.png" : "sound.png";
    hoverSound.muted = isMuted;
    clickSound.muted = isMuted;
    bgsound.muted = isMuted;
});

document.querySelectorAll(".race-button").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        if (!isMuted) {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {});
        }
    });

    btn.addEventListener("click", () => {
        if (!isMuted) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }

        bgsound.volume = 0.9;
        bgsound.play().catch(() => {});

        const mins = btn.dataset.mins;
        const seconds = mins * 60;

        setTimeout(() => {
            window.location.href = `timer.html?time=${seconds}`;
        }, 120);
    });
});
