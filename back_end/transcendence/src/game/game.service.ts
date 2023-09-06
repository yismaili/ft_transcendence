import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { BallGameDto } from './dto/ball-game.dto';
import { PaddleGameDto } from './dto/paddle-game.dto';
import { ScoreGameDto } from './dto/score-game.dto';
import { updateGame } from '../../utils/types';

@Injectable()
export class GameService {
  createGame(createGameDto: CreateGameDto) {
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

async updateGame(updateGameDto: UpdateGameDto): Promise<any> {
    // Handle paddle movement based on user input
    if (updateGameDto.upPressed && updateGameDto.rightPaddle > 0) {
        updateGameDto.rightPaddle -= updateGameDto.paddleSpeed;
    } else if (updateGameDto.downPressed && updateGameDto.rightPaddle < updateGameDto.canvasHeight - updateGameDto.paddleHeight) {
        updateGameDto.rightPaddle += updateGameDto.paddleSpeed;
    }

    if (updateGameDto.wPressed && updateGameDto.leftPaddle > 0) {
        updateGameDto.leftPaddle -= updateGameDto.paddleSpeed;
    } else if (updateGameDto.sPressed && updateGameDto.leftPaddle < updateGameDto.canvasHeight - updateGameDto.paddleHeight) {
        updateGameDto.leftPaddle += updateGameDto.paddleSpeed;
    }

    // Calculate automatic paddle movement
    if (updateGameDto.ballY > updateGameDto.leftPaddle + updateGameDto.paddleHeight / 2) {
        updateGameDto.leftPaddle += updateGameDto.paddleSpeed;
    } else if (updateGameDto.ballY < updateGameDto.leftPaddle + updateGameDto.paddleHeight / 2) {
        updateGameDto.leftPaddle -= updateGameDto.paddleSpeed;
    }
    if (updateGameDto.ballY > updateGameDto.rightPaddle + updateGameDto.paddleHeight / 2) {
        updateGameDto.rightPaddle += updateGameDto.paddleSpeed;
    } else if (updateGameDto.ballY < updateGameDto.rightPaddle + updateGameDto.paddleHeight / 2) {
        updateGameDto.rightPaddle -= updateGameDto.paddleSpeed;
    }

    // Update ball position
    updateGameDto.ballX += updateGameDto.ballSpeedX;
    updateGameDto.ballY += updateGameDto.ballSpeedY;

    // Handle ball collisions
    if (updateGameDto.ballY - updateGameDto.ballRadius < 0 || updateGameDto.ballY + updateGameDto.ballRadius > updateGameDto.canvasHeight) {
        updateGameDto.ballSpeedY *= -1;
    }

    if (
        updateGameDto.ballY > updateGameDto.leftPaddle - updateGameDto.ballRadius &&
        updateGameDto.ballY < updateGameDto.leftPaddle + updateGameDto.paddleHeight + updateGameDto.ballRadius &&
        updateGameDto.ballX - updateGameDto.ballRadius < updateGameDto.paddleWidth
    ) {
        updateGameDto.ballSpeedX *= -1;
    }

    if (
        updateGameDto.ballY > updateGameDto.rightPaddle - updateGameDto.ballRadius &&
        updateGameDto.ballY < updateGameDto.rightPaddle + updateGameDto.paddleHeight + updateGameDto.ballRadius &&
        updateGameDto.ballX + updateGameDto.ballRadius > updateGameDto.canvasWidth - updateGameDto.paddleWidth
    ) {
        updateGameDto.ballSpeedX *= -1;
    }

    // Handle scoring and winning conditions
    if (updateGameDto.ballX < 0) {
        updateGameDto.rightPlayerScore++;
        this.resetGame(updateGameDto);
    } else if (updateGameDto.ballX > updateGameDto.canvasWidth) {
        updateGameDto.leftPlayerScore++;
        this.resetGame(updateGameDto);
    }

    if (updateGameDto.leftPlayerScore === 5) {
        updateGameDto.player = 'left player';
        this.resetGame(updateGameDto);
    } else if (updateGameDto.rightPlayerScore === 5) {
        updateGameDto.player = 'right player';
        this.resetGame(updateGameDto);
    }
    return updateGameDto;
}

resetGame(updateGameDto: UpdateGameDto) {
    // Implement the reset logic here, including resetting ball position, paddle positions, and scores.
}

  reset(updateGameDto: UpdateGameDto) {
  updateGameDto.ballX = updateGameDto.canvasWidth / 2;
  updateGameDto.ballY = updateGameDto.canvasHeight / 2;
  updateGameDto.ballSpeedX = -updateGameDto.ballSpeedX;
  updateGameDto.ballSpeedY = Math.random() * 10 - 10;
  }

}
