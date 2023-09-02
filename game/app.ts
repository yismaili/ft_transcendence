
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
}

class Paddle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#ffffff';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class PongGame {
    private canvas: Canvas;
    private ball: Ball;
    private leftPaddle: Paddle;
    private rightPaddle: Paddle;

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
    }
}

const game = new PongGame();
function gameLoop() {
    game.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
