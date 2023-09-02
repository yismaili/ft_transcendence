"use strict";
class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        // Set canvas size
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
class PongGame {
    constructor() {
        this.canvas = new Canvas();
        this.ball = new Ball(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2, 10, 10, 10);
        this.leftPaddle = new Paddle(0, this.canvas.getHeight() / 2 - 50, 10, 100);
        this.rightPaddle = new Paddle(this.canvas.getWidth() - 10, this.canvas.getHeight() / 2 - 50, 10, 100);
    }
    draw() {
        this.canvas.clearCanvas();
        this.ball.draw(this.canvas.getContext());
        this.leftPaddle.draw(this.canvas.getContext());
        this.rightPaddle.draw(this.canvas.getContext());
        // Add more drawing logic for scores, lines, etc.
    }
}
const game = new PongGame();
function gameLoop() {
    game.draw();
    // Add game logic here, updating ball and paddle positions
    requestAnimationFrame(gameLoop);
}
gameLoop();
