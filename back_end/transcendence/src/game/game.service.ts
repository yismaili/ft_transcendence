import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { BallGameDto } from './dto/ball-game.dto';
import { PaddleGameDto } from './dto/paddle-game.dto';
import { ScoreGameDto } from './dto/score-game.dto';
import { promises } from 'dns';

@Injectable()
export class GameService {
  createGame(createGameDto: CreateGameDto) {
    console.log("hiiiiiiiiiiiī");
    return `This action returns all game`;
  }

  drawBall(ballGameDto: BallGameDto) {
    ballGameDto.context.fillStyle = '#ffffff';
    ballGameDto.context.beginPath();
    ballGameDto.context.arc(ballGameDto.x, ballGameDto.y, ballGameDto.radius, 0, 2 * Math.PI);
    ballGameDto.context.fill();
    ballGameDto.context.closePath();
  }

  drawPaddle(paddleGameDto: PaddleGameDto) {
    paddleGameDto.context.fillStyle = '#ffffff';
    paddleGameDto.context.fillRect(paddleGameDto.x, paddleGameDto.y, paddleGameDto.width, paddleGameDto.height);
  }

  drawScore(scoreGameDto: ScoreGameDto) {
    scoreGameDto.context.fillStyle = "#ffffff";
    scoreGameDto.context.font = "small-caps 18px Arial";
    scoreGameDto.context.fillText('' + scoreGameDto.leftPlayerScore, 300, 20);
    scoreGameDto.context.fillText('' + scoreGameDto.rightPlayerScore, 490, 20);
}

updateGame(updateGameDto: UpdateGameDto) :Promise<any>{
    // clean canvas 
    // updateGameDto.canvas.clearCanvas();
    // move right paddle up and down
    if (updateGameDto.upPressed === true && updateGameDto.rightPaddle > 0){
        updateGameDto.rightPaddle -= updateGameDto.paddleSpeed;
    }
    else if(updateGameDto.downPressed === true && updateGameDto.rightPaddle < updateGameDto.canvasHeight - updateGameDto.paddleHeight){
        updateGameDto.rightPaddle += updateGameDto.paddleSpeed;
    }

    // move lift paddle w and s
    if (updateGameDto.wPressed === true && updateGameDto.leftPaddle > 0){
        updateGameDto.leftPaddle -= updateGameDto.paddleSpeed;
    }
    else if(updateGameDto.sPressed === true && updateGameDto.leftPaddle < updateGameDto.canvasHeight - updateGameDto.paddleHeight){
        updateGameDto.leftPaddle += updateGameDto.paddleSpeed;
    }

    // move  paddle automaticlly based on ball position
    if (updateGameDto.ballY > updateGameDto.leftPaddle + updateGameDto.paddleHeight / 2) {
        updateGameDto.leftPaddle += updateGameDto.paddleSpeed;
    }else if (updateGameDto.ballY < updateGameDto.leftPaddle + updateGameDto.paddleHeight / 2){
        updateGameDto.leftPaddle -= updateGameDto.paddleSpeed;
    }

    if (updateGameDto.ballY > updateGameDto.rightPaddle + updateGameDto.paddleHeight / 2) {
        updateGameDto.rightPaddle += updateGameDto.paddleSpeed;
    }else if (updateGameDto.ballY < updateGameDto.rightPaddle + updateGameDto.paddleHeight / 2){
        updateGameDto.rightPaddle -= updateGameDto.paddleSpeed;
    }
    // move ball
    if (!updateGameDto.finished) {
        updateGameDto.ballX += updateGameDto.ballSpeedX;
        updateGameDto.ballY += updateGameDto.ballSpeedY;
    }

    // check if ball collides with top or bottom
    if (updateGameDto.ballY - updateGameDto.ballRadius < 0 || updateGameDto.ballY + updateGameDto.ballRadius > updateGameDto.canvasHeight){
        updateGameDto.ballSpeedY *= (-1);
    }

    // check if ball colides with left paddle
    if (updateGameDto.ballY > updateGameDto.leftPaddle +100  && updateGameDto.ballY < updateGameDto.leftPaddle + updateGameDto.paddleHeight && updateGameDto.ballX - updateGameDto.ballRadius < updateGameDto.paddleWidth){  
        updateGameDto.ballSpeedX *= (-1);
    }
    // check if ball colides with right paddle
    if (updateGameDto.ballY > updateGameDto.rightPaddle && updateGameDto.ballY < updateGameDto.rightPaddle + updateGameDto.paddleHeight && updateGameDto.ballX + updateGameDto.ballRadius > updateGameDto.canvasWidth - updateGameDto.paddleWidth){
        updateGameDto.ballSpeedX *= (-1);
    }
    // check if ball goes out of bounds on left or right side
    if (updateGameDto.ballX < 0){
        updateGameDto.rightPlayerScore++;
        this.reset(updateGameDto);
    }
    else if (updateGameDto.ballX > updateGameDto.canvasWidth) {
        updateGameDto.leftPlayerScore++;
      this.reset(updateGameDto);
    } 
    // check if player has won
    if (updateGameDto.leftPlayerScore === 5){
        updateGameDto.player = ' left player ';
        this.reset(updateGameDto);
    }
    else if (updateGameDto.rightPlayerScore === 5){
        updateGameDto.player = ' right player ';
        this.reset(updateGameDto);
    }
    return ;
  }
  reset(updateGameDto: UpdateGameDto) {
  updateGameDto.ballX = updateGameDto.canvasWidth / 2;
  updateGameDto.ballY = updateGameDto.canvasHeight / 2;
  updateGameDto.ballSpeedX = -updateGameDto.ballSpeedX;
  updateGameDto.ballSpeedY = Math.random() * 10 - 10;
  }

}
