
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
    private radius: number;;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
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

class MiddleLine {
    private firstPoint: number;
    private endPoint: number;

    constructor(firstPoint: number, endPoint: number) {
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

    constructor(leftPlayerScore: number, rightPlayerScore: number) {
        this.leftPlayerScore = leftPlayerScore;
        this.rightPlayerScore = rightPlayerScore;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "#ffffff";
        context.font = "small-caps 18px Arial";
        context.fillText('' + this.leftPlayerScore, 300, 20);
        context.fillText('' + this.rightPlayerScore, 490, 20);
    }
}

class PongGame {
    private canvas: Canvas;
    private ball: Ball;
    private leftPaddle_: Paddle;
    private rightPaddle_: Paddle;
    private middleLine: MiddleLine;
    private leftPlayerScore: number;
    private rightPlayerScore: number;
    private score: Score;
    private ballX: number;
    private ballY: number;
    private ballSpeedX: number;
    private ballSpeedY: number;
    private paddleHeight: number;
    private ballRadius: number;
    private paddleSpeed: number;
    private upPressed: boolean;
    private downPressed: boolean;
    private wPressed: boolean;
    private sPressed: boolean;
    private leftPaddle: number;
    private rightPaddle: number;
    private paddleWidth: number;
    private player: string;
    private startBtn: HTMLElement | null;
    private isRunning: boolean;
    private finished: boolean;
    public socket :any;

    constructor() {
        this.canvas = new Canvas();
        // Establish a socket.io connection
        this.socket = io("http://localhost:3001");
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
        this.finished = false;
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

    draw() {
        this.canvas.clearCanvas();
        this.ball.draw(this.canvas.getContext());
        this.leftPaddle_.draw(this.canvas.getContext());
        this.rightPaddle_.draw(this.canvas.getContext());
        this.middleLine.draw(this.canvas.getContext());
        this.score.draw(this.canvas.getContext());
    }

    private update() {
        // clean canvas 
        this.canvas.clearCanvas();
        this.socket.emit('updateGame', {leftPaddle: this.leftPaddle,
            rightPaddle: this.rightPaddle,
            paddleWidth: this.paddleWidth,
            ballSpeedX: this.ballSpeedX,
            ballSpeedY: this.ballSpeedY,
            paddleHeight: this.paddleHeight,
            ballRadius: this.ballRadius,
            paddleSpeed: this.paddleSpeed,
            upPressed: this.upPressed,
            downPressed: this.downPressed,
            wPressed: this.wPressed,
            sPressed: this.sPressed,
            score: this.score,
            ballX: this.ballX,
            ballY: this.ballY,
            rightPlayerScore:this.rightPlayerScore,
            leftPlayerScore: this.leftPlayerScore,
            player: this.player,
            canvasHeight: this.canvas.getHeight(),
            canvasWidth: this.canvas.getWidth(),
            finished: this.finished,
        }, 
        (response: {
            leftPaddle: number,
            rightPaddle: number,
            paddleWidth: number,
            ballSpeedX: number,
            ballSpeedY: number,
            paddleHeight: number,
            ballRadius: number,
            paddleSpeed: number,
            upPressed: boolean,
            downPressed: boolean,
            wPressed: boolean,
            sPressed: boolean,
            score: number,
            ballX: number,
            ballY: number,
            rightPlayerScore:number,
            leftPlayerScore: number,
            player: string,
            canvasHeight:number,
            canvasWidth:number,
            finished:boolean,
        }) => {
            this.rightPaddle = response.rightPaddle;
            this.leftPaddle = response.leftPaddle;
            this.paddleWidth = response.paddleWidth;
            this.ballSpeedX = response.ballSpeedX;
            this.ballSpeedY = response.ballSpeedY;
            this.paddleHeight = response.paddleHeight;
            this.ballRadius = response.ballRadius;
            this.paddleSpeed = response.paddleSpeed;
            this.upPressed = response.upPressed;
            this.downPressed = response.downPressed;
            this.wPressed = response.wPressed;
            this.sPressed = response.sPressed;
            this.ballX = response.ballX;
            this.ballY = response.ballY;        
            this.rightPlayerScore = response.rightPlayerScore;
            this.leftPlayerScore = response.leftPlayerScore;
            this.player = response.player;
            this.finished =response.finished;
            
        });
      
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle,this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
    }


    private playerWin() {
        var message = "Congratulations! " + this.player + " win!";
        $('#message').text(message); // Set the message text
        $('#message-modal').modal('show'); // Display the message modal
        $('#message-modal').modal('hide');
        this.finished = true;
        this.reset();
    }
    private  reset() {
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
pongGame.draw();
        