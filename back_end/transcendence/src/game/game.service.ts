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
import { Socket} from 'socket.io';
// import { PongGame } from '../../../../game/app'

@Injectable()
export class GameService {


  // map<string, string[]> players;


  // 1, 4

  // room_1

  // players.set("room_1", 1);

  // players.set("room_1", 4);

    players: Map<string, string[]> = new Map<string, string[]>();
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile)private profileRepository: Repository<Profile>,
        @InjectRepository(Relation)private relationRepository: Repository<Relation>,
        @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
        @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
        @InjectRepository(ChatRoom)private chatRepository: Repository<ChatRoom>,
        @InjectRepository(GameLogsEntity)private gameLogsRepository: Repository<GameLogsEntity>,
        ) {}

      async createGameRandom(createGameDto: CreateGameDto, playerId: Socket): Promise<void> {
          try {
            const user = await this.userRepository.findOne({
              where: { username: createGameDto.username },
            });
        
            if (!user) {
              throw new Error('User does not exist');
            }
        
            let roomName = '';
            if (this.players.size === 0) {
              roomName = 'room_' + user.username;
            } else {
              const maxPlayersPerRoom = 2;
              for (const [name, players] of this.players) {
                if (players.length < maxPlayersPerRoom) {
                  roomName = name;
                  break;
                }
              }
              if (!roomName) {
                roomName = 'room_' + user.username + this.players.size;
              }
            }
            
            playerId.join(roomName);
            
            if (!this.players.has(roomName)) {
              this.players.set(roomName, []);
            }
            
            this.players.get(roomName).push(user.username);
            
            if (this.players.get(roomName).length === 2) {
              const pongGame = new PongGame();
              pongGame.start();
            }
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
      
  async startGame(updateGameDto: UpdateGameDto){

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

class PongGame {
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
  private leftPlayerScore: number;
  private rightPlayerScore: number;
  private upPressed: boolean;
  private downPressed: boolean;
  private wPressed: boolean;
  private sPressed: boolean;
  private ballY: number;
  private ballX: number;
  private player:string;
  private intervalId: NodeJS.Timeout | null;
  private isRunning: boolean;

  constructor() {
    this.canvasWidth = 800;
    this.canvasHeight = 600;
    this.paddleWidth = 10;
    this.paddleHeight = 80;
    this.paddleSpeed = 5;
    this.ballRadius = 5;
    this.ballSpeedX = 5;
    this.ballSpeedY = 2;
    this.leftPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;
    this.rightPaddle = this.canvasHeight / 2 - this.paddleHeight / 2;
    this.leftPlayerScore = 0;
    this.rightPlayerScore = 0;
    this.player = '';
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

  // Calculate automatic paddle movement
  if (this.ballY > this.leftPaddle + this.paddleHeight / 2) {
      this.leftPaddle += this.paddleSpeed;
  } else if (this.ballY < this.leftPaddle + this.paddleHeight / 2) {
      this.leftPaddle -= this.paddleSpeed;
  }
  if (this.ballY > this.rightPaddle + this.paddleHeight / 2) {
      this.rightPaddle += this.paddleSpeed;
  } else if (this.ballY < this.rightPaddle + this.paddleHeight / 2) {
      this.rightPaddle -= this.paddleSpeed;
  }

  // Update ball position
  this.ballX += this.ballSpeedX;
  this.ballY += this.ballSpeedY;
  // Handle ball collisions
  if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.canvasHeight) {
      this.ballSpeedY *= -1;
  }

  if (
      this.ballY > this.leftPaddle - this.ballRadius &&
      this.ballY < this.leftPaddle + this.paddleHeight + this.ballRadius &&
      this.ballX - this.ballRadius < this.paddleWidth
  ) {
      this.ballSpeedX *= -1;
  }

  if (
      this.ballY > this.rightPaddle - this.ballRadius &&
      this.ballY < this.rightPaddle + this.paddleHeight + this.ballRadius &&
      this.ballX + this.ballRadius > this.canvasWidth - this.paddleWidth
  ) {
      this.ballSpeedX *= -1;
  }

  // Handle scoring and winning conditions
  if (this.ballX < 0) {
      this.rightPlayerScore++;
  this.resetGame();
  } else if (this.ballX > this.canvasWidth) {
      this.leftPlayerScore++;
  this.resetGame();
  }

  if (this.leftPlayerScore === 5) {
      this.player = 'left player';
      this.resetGame();
     this.stop();
  } else if (this.rightPlayerScore === 5) {
      this.player = 'right player';
      this.resetGame();
     this.stop();
  }
  }

  resetGame() {
   this.ballX =this.canvasWidth / 2;
   this.ballY =this.canvasHeight / 2;
   this.ballSpeedX = -this.ballSpeedX;
   this.ballSpeedY = Math.random() * 10 - 10;
  }
 
  async getBallX(): Promise<number>{
    return this.ballX;
  }
  async getBallY(): Promise<number>{
    return this.ballY;
  }
  print(){
    console.log('X--->'+ this.ballX);
    console.log('Y--->'+ this.ballY);
  }
  start() {
    if (!this.isRunning) {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.updateGame();
            this.print();
        }, 1000 / 60); // 60 frames per second
    }
}
stop() {
    if (this.isRunning) {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.leftPlayerScore = 0;
        this.rightPlayerScore = 0;
    }
}
}

