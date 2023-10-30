export class PongGame {
  private canvasWidth: number;
  private canvasHeight: number;
  private paddleWidth: number;
  private paddleHeight: number;
  private paddleSpeed: number;
  private ballRadius: number;
  private ballSpeedX: number;
  private ballSpeedY: number;
  private leftPaddle: number;
  private rightPaddle: number;
  public leftPlayerScore: number;
  public rightPlayerScore: number;
  private upPressed: boolean;
  private downPressed: boolean;
  private wPressed: boolean;
  private sPressed: boolean;
  private ballY: number;
  private ballX: number;
  public winnerPlayer: string;
  private intervalId: NodeJS.Timeout | null;
  private isRunning: boolean;

  constructor() {
    // Initialize game properties
    this.canvasWidth = 800;
    this.canvasHeight = 600;
    this.paddleWidth = 10;
    this.paddleHeight = 80;
    this.paddleSpeed = 10;
    this.ballRadius = 10;
    this.ballSpeedX = 10;
    this.ballSpeedY = 10;
    this.leftPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;
    this.rightPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;
    this.leftPlayerScore = 0;
    this.rightPlayerScore = 0;
    this.winnerPlayer = null;
    this.ballX = this.canvasWidth / 2;
    this.ballY = this.canvasHeight / 2;
    this.upPressed = false;
    this.downPressed = false;
    this.wPressed = false;
    this.sPressed = false;
    this.intervalId = null;
    this.isRunning = false;
  }
   
  async updateGame() {
    // Paddle movement 
    if (this.upPressed && this.rightPaddle > 0) {
      this.rightPaddle -= this.paddleSpeed;
    } else if (this.downPressed && this.rightPaddle < this.canvasHeight - this.paddleHeight) {
      this.rightPaddle += this.paddleSpeed;
    }

    if (this.wPressed && this.leftPaddle > 0) {
      this.leftPaddle -= this.paddleSpeed;
    } else if (this.sPressed && this.leftPaddle < this.canvasHeight - this.paddleHeight) {
      this.leftPaddle += this.paddleSpeed;
    }

    // Update ball position
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;

    //  // Calculate automatic paddle movement
      // if (this.ballY > this.leftPaddle + this.paddleHeight / 2) {
      //   this.leftPaddle += this.paddleSpeed;
      // } else if (this.ballY < this.leftPaddle + this.paddleHeight / 2) {
      //   this.leftPaddle -= this.paddleSpeed;
      // }

      // if (this.ballY > this.rightPaddle + this.paddleHeight / 2) {
      //   this.rightPaddle += this.paddleSpeed;
      // } else if (this.ballY < this.rightPaddle + this.paddleHeight / 2) {
      //   this.rightPaddle -= this.paddleSpeed;
      // }

    // Handle ball collisions with top and bottom walls
    if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.canvasHeight) {
      // Reverse the vertical direction of the ball when it hits the top or bottom
      this.ballSpeedY *= -1;
    }

    if(((this.ballY + this.ballRadius) > this.leftPaddle  && (this.ballX - this.ballRadius) < this.paddleWidth && (this.ballY < this.leftPaddle)) 
          || ((this.ballY - this.ballRadius) < (this.leftPaddle + this.paddleHeight)  && (this.ballX - this.ballRadius) < this.paddleWidth && (this.ballY > (this.leftPaddle + this.paddleHeight))))
        {
        this.ballSpeedX *= -1;
        this.ballSpeedY *= -1;
      }
    // Handle ball collisions with paddles
    else if (
      this.ballY > this.leftPaddle - this.ballRadius &&
      this.ballY < this.leftPaddle + this.paddleHeight + this.ballRadius &&
      this.ballX - this.ballRadius < this.paddleWidth
    ) {
      // Reverse the horizontal direction of the ball when it hits the left paddle
      this.ballSpeedX *= -1;
    }

    if(((this.ballY + this.ballRadius) > this.rightPaddle  && (this.ballX + this.ballRadius) > (this.canvasWidth - this.paddleWidth) && (this.ballY < this.rightPaddle)) 
    || ((this.ballY - this.ballRadius) < (this.rightPaddle + this.paddleHeight)  && (this.ballX + this.ballRadius) > (this.canvasWidth - this.paddleWidth) && (this.ballY > (this.rightPaddle + this.paddleHeight))))
    {
      this.ballSpeedX *= -1;
      this.ballSpeedY *= -1;
    }
    else if (
      this.ballY > this.rightPaddle - this.ballRadius &&
      this.ballY < this.rightPaddle + this.paddleHeight + this.ballRadius &&
      this.ballX + this.ballRadius > this.canvasWidth - this.paddleWidth
    ) {
      // Reverse the horizontal direction of the ball when it hits the right paddle
      this.ballSpeedX *= -1;
    }


    // Handle scoring and winning conditions
    if (this.ballX <= 0) {
      this.rightPlayerScore++;
      this.resetGame();
    } else if (this.ballX >= this.canvasWidth) {
      this.leftPlayerScore++;
      this.resetGame();
    }

    if (this.leftPlayerScore === 5) {
      this.winnerPlayer = 'left';
      this.resetGame();
      this.isGameOver();
      this.ballX = this.canvasWidth / 2;
      this.ballY = this.canvasHeight / 2;
      this.leftPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;
      this.rightPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;

    } else if (this.rightPlayerScore === 5) {
      this.winnerPlayer = 'right';
      this.resetGame();
      this.isGameOver();
      this.ballX = this.canvasWidth / 2;
      this.ballY = this.canvasHeight / 2;
      this.leftPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;
      this.rightPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;
    }

  }

  resetGame() {
    this.ballX = this.canvasWidth / 2;
    this.ballY = this.canvasHeight / 2;
    this.ballSpeedX = - this.ballSpeedX;
    this.ballSpeedY = Math.random() * 2 + this.ballSpeedY;
  }

  getBallX(): number {
    return this.ballX;
  }

  getBallY(): number {
    return this.ballY;
  }

  getLeftPaddle(): number {
    return this.leftPaddle;
  }

  getRightPaddle(): number {
    return this.rightPaddle;
  }

  setUpPressed(up: boolean) {
    this.upPressed = up;
  }

  setDownPressed(down: boolean) {
    this.downPressed = down;
  }

  setWPressed(w: boolean) {
    this.wPressed = w;
  }

  setSPressed(s: boolean) {
    this.sPressed = s;
  }

  getlLeftPlayerScore(): number {
    return this.leftPlayerScore;
  }

  getrRightPlayerScore(): number {
    return this.rightPlayerScore;
  }

  getStatus(): boolean {
    return this.isRunning;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.updateGame();
      }, 1000 / 60);
    }
  }

  isGameOver(): boolean {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      return true;
    }
    return false;
  } 
}
