"use strict";
class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
    }
    getContext() {
        return this.context;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    getWidth() {
        return this.canvas.width;
    }
    getHeight() {
        return this.canvas.height;
    }
}
class Ball {
    constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    draw(context) {
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
    getSpeedX() {
        return (this.speedX);
    }
    getSpeedY() {
        return (this.speedY);
    }
}
class Paddle {
    constructor(x, y, width, height, paddleSpeed, rightPaddle, leftPaddle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.paddleSpeed = paddleSpeed;
        this.rightPaddle = rightPaddle;
        this.leftPaddle = leftPaddle;
    }
    draw(context) {
        context.fillStyle = '#ffffff';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    getPaddleSpeed() {
        return (this.paddleSpeed);
    }
}
class MiddleLine {
    constructor(firstPoint, endPoint) {
        this.firstPoint = firstPoint;
        this.endPoint = endPoint;
    }
    draw(context) {
        context.strokeStyle = '#ffffff';
        context.beginPath();
        context.moveTo(this.firstPoint, 0);
        context.lineTo(this.firstPoint, this.endPoint);
        context.stroke();
        context.closePath();
    }
}
class Score {
    constructor(leftPlayerScore, rightPlayerScore) {
        this.leftPlayerScore = leftPlayerScore;
        this.rightPlayerScore = rightPlayerScore;
    }
    draw(context) {
        context.fillStyle = "#ffffff";
        context.font = "small-caps 18px Arial";
        context.fillText('SCORE: ' + this.leftPlayerScore, 200, 20);
        context.fillText('SCORE: ' + this.rightPlayerScore, 500, 20);
    }
}
class StartBtn {
    constructor() {
        this.startBtn = document.getElementById('start-btn');
        this.isRunning = false;
    }
    start() {
        if (!this.isRunning) {
            // gameLoop();
            this.isRunning = true;
        }
    }
}
class KeyboardInput {
    constructor() {
        this.upPressed = false;
        this.downPressed = false;
        this.wPressed = false;
        this.sPressed = false;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }
    keyDownHandler(e) {
        if (e.key === "ArrowUp") {
            this.upPressed = true;
        }
        else if (e.key === "ArrowDown") {
            this.downPressed = true;
        }
        else if (e.key === "w") {
            this.wPressed = true;
        }
        else if (e.key === "s") {
            this.sPressed = true;
        }
    }
    keyUpHandler(e) {
        if (e.key === "ArrowUp") {
            this.upPressed = false;
        }
        else if (e.key === "ArrowDown") {
            this.downPressed = false;
        }
        else if (e.key === "w") {
            this.wPressed = false;
        }
        else if (e.key === "s") {
            this.sPressed = false;
        }
    }
    isUpPressed() {
        return this.upPressed;
    }
    isDownPressed() {
        return this.downPressed;
    }
    isWPressed() {
        return this.wPressed;
    }
    isSPressed() {
        return this.sPressed;
    }
}
class update {
}
class PongGame {
    constructor() {
        this.leftPlayerScore = 0;
        this.rightPlayerScore = 0;
        this.canvas = new Canvas();
        this.ball = new Ball(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2, 10, 10, 10);
        this.leftPaddle = new Paddle(0, this.canvas.getHeight() / 2 - 50, 10, 100, 10, (this.canvas.getHeight / 2 - 50), (this.canvas.getHeight / 2 - 50));
        this.rightPaddle = new Paddle(this.canvas.getWidth() - 10, this.canvas.getHeight() / 2 - 50, 10, 100, 10, (this.canvas.getHeight / 2 - 50), (this.canvas.getHeight / 2 - 50));
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
        this.startBtn = new StartBtn();
    }
    draw() {
        this.canvas.clearCanvas();
        this.ball.draw(this.canvas.getContext());
        this.leftPaddle.draw(this.canvas.getContext());
        this.rightPaddle.draw(this.canvas.getContext());
        this.middleLine.draw(this.canvas.getContext());
        this.score.draw(this.canvas.getContext());
        this.startBtn.start();
        // Usage
        const keyboard = new KeyboardInput();
        // Example of how to use it in your game logic:
        if (keyboard.isUpPressed()) {
            // Perform an action when the "ArrowUp" key is pressed
        }
        if (keyboard.isWPressed()) {
            // Perform an action when the "w" key is pressed
        }
    }
}
const game = new PongGame();
function gameLoop() {
    game.draw();
    requestAnimationFrame(gameLoop);
}
