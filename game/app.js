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
        this.socket = io("http://localhost:3001", {
            extraHeaders: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ5aXNtYWlsaSIsImZpcnN0TmFtZSI6InlvdW5lcyIsImxhc3ROYW1lIjoiaXNtYWlsaSIsImVtYWlsIjoieWlzbWFpbGkxMzM3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKeW9QLUJuZjcxVTVKcDBwWE5faUxSMHB0WDJWWXhnTEdlc09CTklKaVY5Zz1zOTYtYyIsInByb2ZpbGUiOnsiaWQiOjEsInNjb3JlIjowLCJsb3MiOjAsIndpbiI6MCwieHAiOjAsImxldmVsIjowfSwidXNlclJlbGF0aW9ucyI6W10sImZyaWVuZFJlbGF0aW9ucyI6W10sImFjaGlldmVtZW50cyI6W10sImhpc3RvcmllcyI6W10sImlhdCI6MTY5NDg2OTE1M30._BgOmYPL6IU0NV0VPf7W0G31DfT6wEvE-GuyMIRUsIk'
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
        // Add keyboard event listeners
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        this.username = document.getElementById("username");
        this.friendUsername = document.getElementById("friendUsername");
        if (this.JoinBtn) {
            this.JoinBtn.addEventListener('click', this.joinGame.bind(this));
            // this.JoinBtn.addEventListener('click', this.joinGameFriend.bind(this));
        }
        if (this.ntvBtn) {
            this.ntvBtn.addEventListener('click', this.acceptRequest.bind(this));
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
        // clean canvas 
        this.canvas.clearCanvas();
        this.socket.emit('updateGame', { sPressed: this.sPressed, wPressed: this.wPressed, upPressed: this.upPressed, downPressed: this.downPressed });
        this.socket.on('updateGame', function (response) {
            _this.ballX = response.ballX;
            _this.ballY = response.ballY;
            _this.leftPaddle = response.leftPaddle;
            _this.rightPaddle = response.rightPaddle;
            _this.leftPlayerScore = response.leftPlayerScore;
            _this.rightPlayerScore = response.rightPlayerScore;
        });
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
        this.leftPaddle_ = new Paddle(0, this.leftPaddle, this.paddleWidth, this.paddleHeight);
        this.rightPaddle_ = new Paddle(this.canvas.getWidth() - 10, this.rightPaddle, this.paddleWidth, this.paddleHeight);
        this.middleLine = new MiddleLine(this.canvas.getWidth() / 2, this.canvas.getHeight());
        this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
    };
    PongGame.prototype.start = function () {
        var _this = this;
        if (!this.isRunning) {
            this.isRunning = true;
            this.intervalId = setInterval(function () {
                _this.update();
                _this.draw();
            }, 1000 / 100); // 100 frames per second
        }
    };
    // stop() {
    //     if (this.isRunning) {
    //         clearInterval(this.intervalId);
    //         this.isRunning = false;
    //         this.leftPlayerScore = 0;
    //         this.rightPlayerScore = 0;
    //     }
    // }
    PongGame.prototype.joinGame = function () {
        var _a;
        this.socket.emit("createGame", { username: (_a = this.username) === null || _a === void 0 ? void 0 : _a.value }, function () {
            //this.GameId = response.id;
        });
    };
    PongGame.prototype.joinGameFriend = function () {
        var _a, _b;
        this.socket.emit("createGameFriend", { username: (_a = this.username) === null || _a === void 0 ? void 0 : _a.value, friendUsername: (_b = this.friendUsername) === null || _b === void 0 ? void 0 : _b.value });
    };
    PongGame.prototype.acceptRequest = function () {
        var res = true;
        this.socket.emit("responseFromFriend", res);
    };
    return PongGame;
}());
var pongGame = new PongGame();
pongGame.start();
pongGame.socket.on('inviteFriend', function (response) {
    console.log(response);
});
