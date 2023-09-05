import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { BallGameDto } from './dto/ball-game.dto';
import { PaddleGameDto } from './dto/paddle-game.dto';
import { ScoreGameDto } from './dto/score-game.dto';

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

update(id: number, updateGameDto: UpdateGameDto) {
  return `This action updates a #${id} game`;
}

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }


  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
