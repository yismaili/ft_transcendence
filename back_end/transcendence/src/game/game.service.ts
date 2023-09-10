import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { User } from 'src/typeorm/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { Not, Repository } from 'typeorm';
import { UpdateResultDto } from './dto/update-result.dto';
import { GameLogsEntity } from 'src/typeorm/entities/game-logs-entity';
// import { PongGame } from '../../../../game/app'

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile)private profileRepository: Repository<Profile>,
        @InjectRepository(Relation)private relationRepository: Repository<Relation>,
        @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
        @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
        @InjectRepository(ChatRoom)private chatRepository: Repository<ChatRoom>,
        @InjectRepository(GameLogsEntity)private gameLogsRepository: Repository<GameLogsEntity>,
        ) {}
        // private pongGame: PongGame;

    async createGameRandom(createGameDto: CreateGameDto): Promise<any> {
        try {
          const user = await this.userRepository.findOne({
            where: { username: createGameDto.username }
          });
      
          if (!user) {
            throw new Error('User does not exist');
          }
      
          const matching = await this.gameLogsRepository.findOne({
            where: { status: 'waiting' },
          });
      
          if (!matching) {
            const createGameLogs = this.gameLogsRepository.create({
              status: 'waiting',
              gameRoom: user.username,
              user: user,
            });
      
            const savedGameLogs = await this.gameLogsRepository.save(createGameLogs);
            return savedGameLogs;
          }
      
          const matchingUser = await this.userRepository.findOne({where: { id: matching?.user?.id }});
          matching.status = 'down';
          await this.gameLogsRepository.save(matching);
      
          const createHistory = this.historyRepository.create({
            user: user,
            userCompetitor: matchingUser,
            resulteOfUser: 0,
            resulteOfCompetitor: 0,
            status: 'accepted',
          });
      
          const savedHistory = await this.historyRepository.save(createHistory);
          return savedHistory;
        } catch (error) {
          throw error;
        }
    }
         
    async createGameFriend(createGameDto: CreateGameDto): Promise<any> {
        try {
          const user = await this.userRepository.findOne({
            where: { username: createGameDto.username }
          });
          const friend = await this.userRepository.findOne({
            where: { username: createGameDto.friendUsername }
          });
      
          if (!user || !friend) {
            throw new Error('User does not exist');
          }
      
          const existingRequest = await this.historyRepository.findOne({
            where: { user: {id: user.id}, status: 'sendRequest' }
          });
      
          if (existingRequest) {
            throw new Error('A request has already been sent');
          }
      
          const createHistory = this.historyRepository.create({
            user: user,
            userCompetitor: friend,
            status: 'sendRequest',
            resulteOfCompetitor: 0,
            resulteOfUser: 0,
          });
      
          const savedHistory = await this.historyRepository.save(createHistory);
          return savedHistory;
        } catch (error) {
          throw error;
        }
      }
      
    async getGameRequest(createGameDto: CreateGameDto):Promise<any> {
        const user = await this.userRepository.findOne({
            where: { username: createGameDto.username }
        });
        if (!user) {
            throw new Error('user do not exist');
        }
        const request = await this.historyRepository.find({
            where:{user:{id: user.id}, status: 'sendRequest'}
        });
        return request;
    }

    async accepteGameRequest(createGameDto: CreateGameDto) {
        try {
          const user = await this.userRepository.findOne({
            where: { username: createGameDto.username }
          });
      
          const friend = await this.userRepository.findOne({
            where: { username: createGameDto.friendUsername }
          });
      
          if (!user || !friend) {
            throw new Error('User does not exist');
          }
      
          const request = await this.historyRepository.findOne({
            where: {
              user: { id: user.id },
              status: 'sendRequest',
              userCompetitor: { id: friend.id }
            }
          });
      
          if (!request) {
            throw new Error('Game request not found');
          }
      
          request.status = 'accepted';
          const acceptedRequest = await this.historyRepository.save(request);
          return acceptedRequest;
        } catch (error) {
          throw error;
        }
      }
      

    async updateGame(updateGameDto: UpdateGameDto): Promise<any> {
        const gameRoomid = await this.historyRepository.findOne({
            where:[ {id: updateGameDto.GameId}, {status: 'accepted'}]
        });
        if (!gameRoomid){
            return updateGameDto;
        }
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
        // if (updateGameDto.ballY > updateGameDto.rightPaddle + updateGameDto.paddleHeight / 2) {
        //     updateGameDto.rightPaddle += updateGameDto.paddleSpeed;
        // } else if (updateGameDto.ballY < updateGameDto.rightPaddle + updateGameDto.paddleHeight / 2) {
        //     updateGameDto.rightPaddle -= updateGameDto.paddleSpeed;
        // }

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
            const result: UpdateResultDto = {
                id: updateGameDto.GameId,
                userResult: updateGameDto.leftPlayerScore,
                competitorResult: updateGameDto.rightPlayerScore,
            }
            this.UpdateResult(result);
        } else if (updateGameDto.rightPlayerScore === 5) {
            updateGameDto.player = 'right player';
            this.resetGame(updateGameDto);
            const result: UpdateResultDto = {
                id: updateGameDto.GameId,
                userResult: updateGameDto.leftPlayerScore,
                competitorResult: updateGameDto.rightPlayerScore,
            }
            this.UpdateResult(result);
        }
        return updateGameDto;
    }

    async resetGame(updateGameDto: UpdateGameDto) {
        updateGameDto.ballX = updateGameDto.canvasWidth / 2;
        updateGameDto.ballY = updateGameDto.canvasHeight / 2;
        updateGameDto.ballSpeedX = -updateGameDto.ballSpeedX;
        updateGameDto.ballSpeedY = Math.random() * 10 - 10;
    }

    async UpdateResult(updateResultDto: UpdateResultDto): Promise<HistoryEntity>{
        const gameHistory = await this.historyRepository.findOne({
            where: {id: updateResultDto.id}
        });
        if (!gameHistory){
            throw new Error('history not found');
        }
        gameHistory.resulteOfUser = updateResultDto.userResult;
        gameHistory.resulteOfCompetitor = updateResultDto.competitorResult;
        const saveUpdate = await this.historyRepository.save(gameHistory);
        return saveUpdate;
    }
    
    }
