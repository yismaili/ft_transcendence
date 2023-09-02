class Canvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = 800; 
        this.canvas.height = 600;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getWidth(): number {
        return this.canvas.width;
    }

    getHeight(): number {
        return this.canvas.height;
    }
}

class Ball {
    private x: number;
    private y: number;
    private radius: number;
    private speedX: number;
    private speedY: number;

    constructor(x: number, y: number, radius: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }

    getSpeedX(): number{
        return (this.speedX);
    }

    getSpeedY(): number{
        return (this.speedY);
    }
}

class Paddle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private paddleSpeed: number;
    private rightPaddle: number;
    private leftPaddle: number;

    constructor(x: number, y: number, width: number, height: number, paddleSpeed: number, rightPaddle: number, leftPaddle: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.paddleSpeed = paddleSpeed;
        this.rightPaddle = rightPaddle;
        this.leftPaddle = leftPaddle;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#ffffff';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    getPaddleSpeed(): number{
        return (this.paddleSpeed);
    }
}

class MiddleLine{
    private firstPoint: number;
    private endPoint: number;
    constructor(firstPoint: number, endPoint: number){
        this.firstPoint = firstPoint;
        this.endPoint = endPoint;
    }

    draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = '#ffffff';
        context.beginPath();
        context.moveTo(this.firstPoint, 0);
        context.lineTo(this.firstPoint, this.endPoint);
        context.stroke();
        context.closePath();
    }
}

class Score {
    private leftPlayerScore: number;
    private rightPlayerScore: number;

    constructor(leftPlayerScore: number, rightPlayerScore: number){
        this.leftPlayerScore = leftPlayerScore;
        this.rightPlayerScore = rightPlayerScore;
    }

    draw (context: CanvasRenderingContext2D){
        context.fillStyle = "#ffffff";
        context.font = "small-caps 18px Arial";
        context.fillText('SCORE: ' + this.leftPlayerScore, 200, 20);
        context.fillText('SCORE: ' + this.rightPlayerScore, 500, 20);
    }

}

class StartBtn {
    private startBtn: HTMLElement | null;
    private isRunning: boolean;

    constructor() {
        this.startBtn = document.getElementById('start-btn');
        this.isRunning = false;
    }
    start(){
        if (!this.isRunning){
            // gameLoop();
            this.isRunning = true;
        }
    }
}

class KeyboardInput {
    private upPressed: boolean = false;
    private downPressed: boolean = false;
    private wPressed: boolean = false;
    private sPressed: boolean = false;

    constructor() {
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    private keyDownHandler(e: KeyboardEvent) {
        if (e.key === "ArrowUp") {
            this.upPressed = true;
        } else if (e.key === "ArrowDown") {
            this.downPressed = true;
        } else if (e.key === "w") {
            this.wPressed = true;
        } else if (e.key === "s") {
            this.sPressed = true;
        }
    }

    private keyUpHandler(e: KeyboardEvent) {
        if (e.key === "ArrowUp") {
            this.upPressed = false;
        } else if (e.key === "ArrowDown") {
            this.downPressed = false;
        } else if (e.key === "w") {
            this.wPressed = false;
        } else if (e.key === "s") {
            this.sPressed = false;
        }
    }

    isUpPressed(): boolean {
        return this.upPressed;
    }

    isDownPressed(): boolean {
        return this.downPressed;
    }

    isWPressed(): boolean {
        return this.wPressed;
    }

    isSPressed(): boolean {
        return this.sPressed;
    }
}

// Update game state
class update{
    private
}

class PongGame {
    private canvas: Canvas;
    private ball: Ball;
    private leftPaddle: Paddle;
    private rightPaddle: Paddle;
    private middleLine: MiddleLine;
    private leftPlayerScore: number = 0;
    private rightPlayerScore: number = 0;
    private score: Score;
    private startBtn: StartBtn;

    constructor() {
        this.canvas = new Canvas();
        this.ball = new Ball(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2, 10, 10, 10);
        this.leftPaddle = new Paddle(
            0,
            this.canvas.getHeight() / 2 - 50,
            10,
            100,
            10,
            this.canvas.getHeight() / 2 - 50,
            this.canvas.getHeight() / 2 - 50
        );
        
        this.rightPaddle = new Paddle(
            this.canvas.getWidth() - 10,
            this.canvas.getHeight() / 2 - 50,
            10,
            100,
            10,
            this.canvas.getHeight() / 2 - 50,
            this.canvas.getHeight() / 2 - 50
        );
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


