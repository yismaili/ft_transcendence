import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { BallGameDto } from './dto/ball-game.dto';
import { PaddleGameDto } from './dto/paddle-game.dto';

@WebSocketGateway()
export class GameGateway {
  constructor(private readonly gameService: GameService) {
  }

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @SubscribeMessage('drawBall')
  drawBall(@MessageBody() ballGameDto: BallGameDto) {
    console.log(ballGameDto);
    return this.gameService.drawBall(ballGameDto);
  }

  @SubscribeMessage('paddle')
  drawPaddle(@MessageBody() paddleGameDto:PaddleGameDto) {
    return this.gameService.drawPaddle(paddleGameDto);
  }

  @SubscribeMessage('updateGame')
  updateGame(@MessageBody() updateGameDto: UpdateGameDto) :Promise<any>{
    return this.gameService.updateGame(updateGameDto);
  }
}
