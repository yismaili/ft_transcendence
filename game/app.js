"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
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
        return this.speedX;
    }
    getSpeedY() {
        return this.speedY;
    }
}
class Paddle {
    constructor(x, y, width, height, paddleSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.paddleSpeed = paddleSpeed;
    }
    draw(context) {
        context.fillStyle = '#ffffff';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    getPaddleSpeed() {
        return this.paddleSpeed;
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
        if (this.startBtn) {
            this.startBtn.addEventListener('click', this.start.bind(this));
        }
    }
    start() {
        if (!this.isRunning) {
            // Implement game start logic here
            this.isRunning = true;
        }
    }
}
class PongGame {
    constructor() {
        this.leftPlayerScore = 0;
        this.rightPlayerScore = 0;
        this.upPressed = false;
        this.downPressed = false;
        this.wPressed = false;
        this.sPressed = false;
        this.canvas = new Canvas();
        this.ball = new Ball(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2, 10, 10, 10);
        this.leftPaddle_ = new Paddle(0, this.canvas.getHeight() / 2 - 50, 10, 100, 10);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.canvas.getHeight() / 2 - 50, 10, 100, 10);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
        this.ballX = this.canvas.getWidth() / 2;
        this.ballY = this.canvas.getHeight() / 2;
        this.ballSpeedX = 5;
        this.ballSpeedY = 5;
        this.ballRadius = 10;
        this.player = '';
        this.paddleHeight = 100;
        this.paddleWidth = 10;
        this.paddleSpeed = 10;
        this.leftPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.rightPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.startBtn = document.getElementById('start-btn');
        this.isRunning = false;
        if (this.startBtn) {
            this.startBtn.addEventListener('click', this.start.bind(this));
        }
        // Add keyboard event listeners
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
    draw() {
        this.canvas.clearCanvas();
        this.ball.draw(this.canvas.getContext());
        this.leftPaddle_.draw(this.canvas.getContext());
        this.rightPaddle_.draw(this.canvas.getContext());
        this.middleLine.draw(this.canvas.getContext());
        this.score.draw(this.canvas.getContext());
    }
    update() {
        // move paddles
        if (this.upPressed && this.rightPaddle > 0) {
            this.rightPaddle -= this.paddleSpeed;
        }
        else if (this.downPressed && this.rightPaddle + this.paddleHeight < this.canvas.getHeight()) {
            this.rightPaddle += this.paddleSpeed;
        }
        // move right paddle automaticlly based on ball position
        if (this.ballY > this.leftPaddle + this.paddleHeight / 2) {
            this.leftPaddle += this.paddleSpeed;
        }
        else if (this.ballY < this.leftPaddle + this.paddleHeight / 2) {
            this.leftPaddle -= this.paddleSpeed;
        }
        // move ball
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedX;
        // check if ball collides with top or bottom
        if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.canvas.getHeight()) {
            this.ballSpeedY = -this.ballSpeedY;
        }
        // check if ball colides with left paddle
        if (this.ballX - this.ballRadius < this.paddleWidth && this.ballY > this.leftPaddle && this.ballY < this.leftPaddle + this.paddleHeight) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        // check if ball collides with right paddle
        if (this.ballX + this.ballRadius > this.canvas.getWidth() - this.paddleWidth && this.ballY > this.rightPaddle && this.ballY < this.rightPaddle + this.paddleHeight) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        // check if ball goes out of bounds on left or right side
        if (this.ballX < 0) {
            this.rightPlayerScore++;
            this.reset();
        }
        else if (this.ballX > this.canvas.getWidth()) {
            this.leftPlayerScore++;
            this.reset();
        }
        // check if player has won
        if (this.leftPlayerScore === 5) {
            this.player = 'left player';
            this.playerWin();
        }
        else if (this.rightPlayerScore == 5) {
            this.player = 'right player';
            this.playerWin();
        }
    }
    playerWin() {
        var message = "Congratulations! " + this.player + " win!";
        (0, jquery_1.default)('#message').text(message); // Set the message text
        (0, jquery_1.default)('#message-modal').modal('show'); // Display the message modal
        this.reset();
    }
    reset() {
        this.ballX = this.canvas.getWidth() / 2;
        this.ballY = this.canvas.getHeight() / 2;
        this.ballSpeedX = -this.ballSpeedX;
        this.ballSpeedY = Math.random() * 10 - 5;
    }
    start() {
        if (!this.isRunning) {
            const gameLoop = () => {
                this.update();
                this.draw();
                requestAnimationFrame(gameLoop);
            };
            this.isRunning = true;
            gameLoop();
        }
    }
}
const pongGame = new PongGame();
pongGame.start();
