"use strict";
// import $ from 'jquery';
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
    ;
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw(context) {
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}
class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(context) {
        context.fillStyle = '#ffffff';
        context.fillRect(this.x, this.y, this.width, this.height);
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
class PongGame {
    constructor() {
        this.canvas = new Canvas();
        this.ballX = this.canvas.getWidth() / 2;
        this.ballY = this.canvas.getHeight() / 2;
        this.ballSpeedX = 10;
        this.ballSpeedY = 10;
        this.ballRadius = 10;
        this.player = '';
        this.paddleHeight = 100;
        this.paddleWidth = 10;
        this.paddleSpeed = 10;
        this.leftPlayerScore = 0;
        this.rightPlayerScore = 0;
        this.upPressed = false;
        this.downPressed = false;
        this.wPressed = false;
        this.sPressed = false;
        this.isRunning = false;
        // init
        this.leftPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.rightPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle, this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
        this.startBtn = document.getElementById('start-btn');
        // Add keyboard event listeners
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        if (this.startBtn) {
            this.startBtn.addEventListener('click', this.start.bind(this));
        }
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
        // clean canvas eria
        this.canvas.clearCanvas();
        // move right paddle up and down
        if (this.upPressed === true && this.rightPaddle > 0) {
            this.rightPaddle -= this.paddleSpeed;
        }
        else if (this.downPressed === true && this.rightPaddle < this.canvas.getHeight() - this.paddleHeight) {
            this.rightPaddle += this.paddleSpeed;
        }
        // move lift paddle w and s
        if (this.wPressed === true && this.leftPaddle > 0) {
            this.leftPaddle -= this.paddleSpeed;
        }
        else if (this.sPressed === true && this.leftPaddle < this.canvas.getHeight() - this.paddleHeight) {
            this.leftPaddle += this.paddleSpeed;
        }
        // move ball 
        this.ballX -= this.ballSpeedX;
        this.ballY += this.ballSpeedY;
        // check if ball collides with top or bottom
        if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.canvas.getHeight()) {
            this.ballSpeedY *= (-1);
        }
        // check if ball colides with left paddle
        if (this.ballY > this.leftPaddle && this.ballY < this.leftPaddle + this.paddleHeight && this.ballX - this.ballRadius < this.paddleWidth) {
            this.ballSpeedX *= (-1);
        }
        // check if ball colides with right paddle
        if (this.ballY > this.rightPaddle && this.ballY < this.rightPaddle + this.paddleHeight && this.ballX + this.ballRadius > this.canvas.getWidth() - this.paddleWidth) {
            this.ballSpeedX *= (-1);
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
            this.player = ' left player ';
            this.playerWin();
        }
        else if (this.rightPlayerScore === 5) {
            this.player = ' right player ';
            this.playerWin();
        }
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle, this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
    }
    playerWin() {
        var message = "Congratulations! " + this.player + " win!";
        $('#message').text(message); // Set the message text
        $('#message-modal').modal('show'); // Display the message modal
        $('#message-modal').modal('hide');
        this.reset();
    }
    reset() {
        this.ballX = this.canvas.getWidth() / 2;
        this.ballY = this.canvas.getHeight() / 2;
        this.ballSpeedX = -this.ballSpeedX;
        this.ballSpeedY = Math.random() * 10 - 10;
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
// pongGame.start();
// this.canvas.clearCanvas();
//  // move paddles
//  if (this.upPressed && this.rightPaddle > 0){
//     this.rightPaddle -= this.paddleSpeed;
// }else if (this.downPressed && this.rightPaddle + this.paddleHeight < this.canvas.getHeight()){
//     this.rightPaddle += this.paddleSpeed;
// }
// // move lift paddle automaticlly based on ball position
// if (this.ballY > this.leftPaddle + this.paddleHeight / 2) {
//     this.leftPaddle += this.paddleSpeed;
// }else if (this.ballY < this.leftPaddle + this.paddleHeight / 2){
//     this.leftPaddle -= this.paddleSpeed;
// }
// // move ball
// this.ballX += this.ballSpeedX;
// this.ballY += this.ballSpeedY;
// // check if ball collides with top or bottom
// if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.canvas.getHeight()){
//     this.ballSpeedY = - this.ballSpeedY;
// }
// // check if ball colides with left paddle
// if (this.ballX - this.ballRadius < this.paddleWidth && this.ballY > this.leftPaddle && this.ballY < this.leftPaddle + this.paddleHeight){
//     this.ballSpeedX = -this.ballSpeedX;
// }
// // check if ball collides with right paddle
// if (this.ballX + this.ballRadius > this.canvas.getWidth() - this.paddleWidth && this.ballY > this.rightPaddle && this.ballY < this.rightPaddle + this.paddleHeight) {
//     this.ballSpeedX = -this.ballSpeedX;
// }
// // check if ball goes out of bounds on left or right side
// if (this.ballX < 0){
//     this.rightPlayerScore++;
//     this.reset();
// }else if (this.ballX > this.canvas.getWidth()){
//     this.leftPlayerScore++;
//     this.reset();
// }
// // check if player has won
// if (this.leftPlayerScore === 5){
//     this.player = 'left player';
//     this.playerWin();
// }else if (this.rightPlayerScore == 5){
//     this.player = 'right player';
//     this.playerWin();
// }
// // update position
