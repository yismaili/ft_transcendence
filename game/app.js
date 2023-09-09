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
        this.GameId = 0;
        // init
        this.leftPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.rightPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle, this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
        this.startBtn = document.getElementById('start-btn');
        this.JoinBtn = document.getElementById('joinGame-btn');
        // Add keyboard event listeners
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        this.username = document.getElementById("username");
        if (this.startBtn) {
            this.startBtn.addEventListener('click', this.start.bind(this));
        }
        if (this.JoinBtn) {
            this.JoinBtn.addEventListener('click', this.joinGame.bind(this));
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
        var _this = this;
        var _a;
        // clean canvas 
        this.canvas.clearCanvas();
        this.socket.emit('updateGame', {
            GameId: this.GameId,
            username: (_a = this.username) === null || _a === void 0 ? void 0 : _a.value,
            leftPaddle: this.leftPaddle,
            rightPaddle: this.rightPaddle, paddleWidth: this.paddleWidth,
            ballSpeedX: this.ballSpeedX, ballSpeedY: this.ballSpeedY,
            paddleHeight: this.paddleHeight, ballRadius: this.ballRadius,
            paddleSpeed: this.paddleSpeed, upPressed: this.upPressed,
            downPressed: this.downPressed, wPressed: this.wPressed,
            sPressed: this.sPressed, score: this.score, ballX: this.ballX,
            ballY: this.ballY, rightPlayerScore: this.rightPlayerScore,
            leftPlayerScore: this.leftPlayerScore, player: this.player,
            canvasHeight: this.canvas.getHeight(), canvasWidth: this.canvas.getWidth(),
        }, function (response) {
            _this.rightPaddle = response.rightPaddle;
            _this.leftPaddle = response.leftPaddle;
            _this.paddleWidth = response.paddleWidth;
            _this.ballX = response.ballX;
            _this.ballY = response.ballY;
            _this.rightPlayerScore = response.rightPlayerScore;
            _this.leftPlayerScore = response.leftPlayerScore;
            _this.player = response.player;
            _this.ballSpeedX = response.ballSpeedX;
            _this.ballSpeedY = response.ballSpeedY;
        });
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle, this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
        if (this.leftPlayerScore == 5 || this.rightPlayerScore == 5) {
            this.playerWin();
        }
    };
    PongGame.prototype.playerWin = function () {
        var message = "Congratulations! " + this.player + " win!";
        $('#message').text(message); // Set the message text
        $('#message-modal').modal('show'); // Display the message modal
        // $('#message-modal').modal('hide');
    };
    PongGame.prototype.start = function () {
        var _this = this;
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
    PongGame.prototype.joinGame = function () {
        var _this = this;
        var _a;
        this.socket.emit("createGame", { username: (_a = this.username) === null || _a === void 0 ? void 0 : _a.value }, function (response) {
            _this.GameId = response.id;
        });
    };
    return PongGame;
}());
var pongGame = new PongGame();
pongGame.update();
