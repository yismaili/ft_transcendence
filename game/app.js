var Canvas = /** @class */ (function () {
    function Canvas() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
    }
    Canvas.prototype.getContext = function () {
        return this.context;
    };
    Canvas.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.getWidth = function () {
        return this.canvas.width;
    };
    Canvas.prototype.getHeight = function () {
        return this.canvas.height;
    };
    return Canvas;
}());
var Ball = /** @class */ (function () {
    function Ball(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    ;
    Ball.prototype.draw = function (context) {
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    };
    return Ball;
}());
var Paddle = /** @class */ (function () {
    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Paddle.prototype.draw = function (context) {
        context.fillStyle = '#ffffff';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    return Paddle;
}());
var MiddleLine = /** @class */ (function () {
    function MiddleLine(firstPoint, endPoint) {
        this.firstPoint = firstPoint;
        this.endPoint = endPoint;
    }
    MiddleLine.prototype.draw = function (context) {
        context.strokeStyle = '#ffffff';
        context.beginPath();
        context.moveTo(this.firstPoint, 0);
        context.lineTo(this.firstPoint, this.endPoint);
        context.stroke();
        context.closePath();
    };
    return MiddleLine;
}());
var Score = /** @class */ (function () {
    function Score(leftPlayerScore, rightPlayerScore) {
        this.leftPlayerScore = leftPlayerScore;
        this.rightPlayerScore = rightPlayerScore;
    }
    Score.prototype.draw = function (context) {
        context.fillStyle = "#ffffff";
        context.font = "small-caps 18px Arial";
        context.fillText('' + this.leftPlayerScore, 300, 20);
        context.fillText('' + this.rightPlayerScore, 490, 20);
    };
    return Score;
}());
var PongGame = /** @class */ (function () {
    function PongGame() {
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
    PongGame.prototype.keyDownHandler = function (e) {
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
    };
    PongGame.prototype.keyUpHandler = function (e) {
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
    };
    PongGame.prototype.draw = function () {
        this.canvas.clearCanvas();
        this.ball.draw(this.canvas.getContext());
        this.leftPaddle_.draw(this.canvas.getContext());
        this.rightPaddle_.draw(this.canvas.getContext());
        this.middleLine.draw(this.canvas.getContext());
        this.score.draw(this.canvas.getContext());
    };
    PongGame.prototype.update = function () {
        // clean canvas 
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
        // move  paddle automaticlly based on ball position
        if (this.ballY > this.leftPaddle + this.paddleHeight / 2) {
            this.leftPaddle += this.paddleSpeed;
        }
        else if (this.ballY < this.leftPaddle + this.paddleHeight / 2) {
            this.leftPaddle -= this.paddleSpeed;
        }
        if (this.ballY > this.rightPaddle + this.paddleHeight / 2) {
            this.rightPaddle += this.paddleSpeed;
        }
        else if (this.ballY < this.rightPaddle + this.paddleHeight / 2) {
            this.rightPaddle -= this.paddleSpeed;
        }
        // move ball
        if (!this.finished) {
            this.ballX += this.ballSpeedX;
            this.ballY += this.ballSpeedY;
        }
        // check if ball collides with top or bottom
        if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.canvas.getHeight()) {
            this.ballSpeedY *= (-1);
        }
        // check if ball colides with left paddle
        if (this.ballY > this.leftPaddle + 100 && this.ballY < this.leftPaddle + this.paddleHeight && this.ballX - this.ballRadius < this.paddleWidth) {
            // console.log("---y-->"+this.ballY);
            // console.log("---lp-->"+this.leftPaddle);
            console.log(this.leftPaddle + this.paddleHeight);
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
    };
    PongGame.prototype.playerWin = function () {
        var message = "Congratulations! " + this.player + " win!";
        $('#message').text(message); // Set the message text
        $('#message-modal').modal('show'); // Display the message modal
        $('#message-modal').modal('hide');
        this.finished = true;
        this.reset();
    };
    PongGame.prototype.reset = function () {
        this.ballX = this.canvas.getWidth() / 2;
        this.ballY = this.canvas.getHeight() / 2;
        this.ballSpeedX = -this.ballSpeedX;
        this.ballSpeedY = Math.random() * 10 - 10;
    };
    PongGame.prototype.start = function () {
        var _this = this;
        console.log('hhhhhhhh');
        this.socket.emit("createGame", this.player);
        if (!this.isRunning) {
            var gameLoop_1 = function () {
                _this.update();
                _this.draw();
                requestAnimationFrame(gameLoop_1);
            };
            this.isRunning = true;
            gameLoop_1();
        }
    };
    PongGame.prototype.sendMsg = function (message) {
        this.socket.emit("createGame", message);
    };
    return PongGame;
}());
var pongGame = new PongGame();
pongGame.draw();
