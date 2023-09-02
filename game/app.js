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
        this.leftPlayerScore = 0;
        this.rightPlayerScore = 0;
        this.canvas = new Canvas();
        this.ball = new Ball(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2, 10, 10, 10);
        this.leftPaddle = new Paddle(0, this.canvas.getHeight() / 2 - 50, 10, 100);
        this.rightPaddle = new Paddle(this.canvas.getWidth() - 10, this.canvas.getHeight() / 2 - 50, 10, 100);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
    }
    draw() {
        this.canvas.clearCanvas();
        this.ball.draw(this.canvas.getContext());
        this.leftPaddle.draw(this.canvas.getContext());
        this.rightPaddle.draw(this.canvas.getContext());
        this.middleLine.draw(this.canvas.getContext());
        this.score.draw(this.canvas.getContext());
    }
}
const game = new PongGame();
function gameLoop() {
    game.draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
