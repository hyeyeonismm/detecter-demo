const body = document.body;
const timerElement = document.getElementById("timer");
const gameOverElement = document.getElementById("gameOver");
const gameWinElement = document.getElementById("gameWin");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");
const darkLayer = document.getElementById("darkLayer");
const lizard = document.createElement("div");

let timer = 10;
let interval;
let found = false;

StartButton.addEventListener("click", () => {
    // 시작 화면 숨기고 게임 화면 보여주기
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    // 게임 시작
    startGame();
});

function startGame() {

    lizard.style.width = "50px";
    lizard.style.height = "50px";
    lizard.style.background = "url('./lizard.jpg') no-repeat center center";
    lizard.style.backgroundSize = "cover";
    lizard.style.position = "absolute";
    lizard.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
    lizard.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    lizard.style.borderRadius = "10px";
    lizard.style.zIndex = 1;
   
    gameScreen.appendChild(lizard);

    lizard.addEventListener("click", () => {
        if (!found) {
            found = true;
            clearInterval(interval);
            gameWinElement.style.display = "block";
            darkLayer.style.display = "none";  
        }
    });

    startTimer();
}

function startTimer() {
    timer = 10;
    interval = setInterval(() => {
        timer--;
        timerElement.innerText = `Time Left: ${timer}s`;
        if (timer <= 0) {
            clearInterval(interval);
            if (!found) {
                gameOverElement.style.display = "block";
                darkLayer.style.display='none'
            }
        }
    }, 1000);
}

function createFlashlightEffect(e) {
    const x = e.clientX;
    const y = e.clientY;
    darkLayer.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 224, 1) 0px, rgba(0, 0, 0, 0.7) 80px, black 200px)`;
    // darkLayer.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 224, 1) 30px, rgba(255, 255, 200, 0.8) 20px, rgba(0, 0, 0, 0.85) 150px, black 250px)`;

}

let lastMouseMoveTime = 0;
body.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastMouseMoveTime > 50) { // Slow down mouse movement effect
        createFlashlightEffect(e);
        lastMouseMoveTime = now;
    }
});