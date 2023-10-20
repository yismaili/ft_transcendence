
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
    private isRunning: boolean;
    public socket :any;
    private username:  HTMLInputElement | null;
    private friendUsername:  HTMLInputElement | null;
    private JoinBtn: HTMLElement | null;
    private GameId: number;
    private intervalId: NodeJS.Timeout | null;
    private ntvBtn:  HTMLElement | null;
    private cancelBtn:  HTMLElement | null;

    constructor() {
        this.canvas = new Canvas();
        // Establish a socket.io connection
        this.socket = io("http://localhost:3001/game", {
            extraHeaders: {
              Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ5aXNtYWlsaSIsImZpcnN0TmFtZSI6InlvdW5lc3NzcyIsImxhc3ROYW1lIjoiaXNtYWlsaSIsInVuaXF1ZW5hbWUiOiJ5aXNtYWlsaSIsImVtYWlsIjoieWlzbWFpbGkxMzM3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RveW1xcHlmay9pbWFnZS91cGxvYWQvdjE2OTc3MTEyNDQvb2x5bXBpY19mbGFnLnBuZyIsInN0YXR1cyI6Im9mZmxpbmUiLCJ0d29GYWN0b3JBdXRoU2VjcmV0IjpudWxsLCJpc1R3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwicHJvZmlsZSI6eyJpZCI6MSwic2NvcmUiOjg1MiwibG9zIjoxNywid2luIjoxNSwieHAiOjEyLCJsZXZlbCI6MTEzfSwiaWF0IjoxNjk3NzcyOTE0fQ.tmYRcHl7vvGWeNLAhSr77vPsGno3v4DEl99Cwegzpw4'
            }
        });
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
        this.GameId = 0;
        this.intervalId = null;
        // init
        this.leftPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.rightPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle, this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
        this.JoinBtn = document.getElementById('joinGame-btn');
        this.ntvBtn = document.getElementById('ntv-btn');
        this.cancelBtn = document.getElementById('cancel-btn');
        // Add keyboard event listeners
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        this.username = document.getElementById("username")as HTMLInputElement;
        this.friendUsername = document.getElementById("friendUsername")as HTMLInputElement;
        if (this.JoinBtn) {
            this.JoinBtn.addEventListener('click', this.joinGame.bind(this));
            // this.JoinBtn.addEventListener('click', this.joinGameFriend.bind(this));
        }
        if (this.ntvBtn){
            this.ntvBtn.addEventListener('click', this. acceptRequest.bind(this));
        }
        if (this.cancelBtn){
            this.cancelBtn.addEventListener('click', this.cancelReq.bind(this));
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

    update() {
        // clean canvas 
        this.canvas.clearCanvas();
        this.socket.emit('updateGame', {sPressed:this.sPressed, wPressed:this.wPressed, upPressed:this.upPressed, downPressed: this.downPressed, username: this.username?.value});         
        this.socket.on('updateGame',(response: {ballX: number, ballY: number, leftPaddle:number, 
            rightPaddle:number, leftPlayerScore:number, rightPlayerScore: number}) => { 
            this.ballX = response.ballX;
            this.ballY = response.ballY;
            this.leftPaddle = response.leftPaddle;
            this.rightPaddle = response.rightPaddle;
            this.leftPlayerScore = response.leftPlayerScore;
            this.rightPlayerScore = response.rightPlayerScore;
        });
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle,this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.intervalId = setInterval(() => {
                this.update();
                this.draw();
            }, 1000 / 100); // 100 frames per second
        }
    }
    joinGame() {
        this.socket.emit("createGame", {username: this.username?.value});
    }
    
    joinGameFriend() {
        this.socket.emit("createGameFriend", { username: this.username?.value, friendUsername: this.friendUsername?.value });
      }
      
    acceptRequest() {
        const res = true;
        this.socket.emit("responseFromFriend", res);
    }
    cancelReq() {
        this.socket.emit("cancelGame", {cancel: true});
    }
      
}

const pongGame = new PongGame();
pongGame.start();

pongGame.socket.on('inviteFriend', (response: {usernam: string, roomName: string }) => {
    console.log(response);
  });
  pongGame.socket.on('players', (response: {rootUsre: string, friendUser: string }) => {
    console.log(response);
  });
        


