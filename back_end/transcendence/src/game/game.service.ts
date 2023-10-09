import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto, UpdateGameRetDto } from './dto/update-game.dto';
import { User } from 'src/typeorm/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { Not, Repository } from 'typeorm';
import { UpdateResultDto } from './dto/update-result.dto';
import { Socket, Server} from 'socket.io';
import { SetHistoryDto } from './dto/set-history.dto';
import { ResultOfGame } from './dto/result-of-game.dto';
import { verify } from 'jsonwebtoken';
import { error } from 'console';

@Injectable()
export class GameService {
  players: Map<string, string[]> = new Map<string, string[]>();
  playWithFriend: Map<string, string[]> = new Map<string, string[]>();
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)private profileRepository: Repository<Profile>,
    @InjectRepository(Relation)private relationRepository: Repository<Relation>,
    @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
    @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
    @InjectRepository(ChatRoom)private chatRepository: Repository<ChatRoom>,
    ) {}

    async createGameRandom(createGameDto: CreateGameDto, playerId: Socket, server: Server): Promise<void> {
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
        await playerId.join(roomName);
    
        if (!this.players.has(roomName)) {
          this.players.set(roomName, []);
        }
    
        this.players.get(roomName).push(user.username);
        if (this.players.get(roomName).length === 2) {
         await this.startGame(roomName, playerId, server);
        }
      } catch (error) {
        throw error;
      }
    }

    async startGame(roomName: string, playerId: Socket, server: Server): Promise<void>{
      const pongGame = new PongGame();
      pongGame.start();
      const rootUser = this.players.get(roomName)[0];
      const friendUser = this.players.get(roomName)[1];

      // Set up an event listener for 'updateGame' outside the interval
      playerId.on('updateGame', (data) => {
       const user = this.getUser(playerId);
        if (rootUser == user){
          pongGame.setDownPressed(data.downPressed);
          pongGame.setUpPressed(data.upPressed);
        }
        if (friendUser == user){
          pongGame.setWPressed(data.wPressed);
          pongGame.setSPressed(data.sPressed);
        }
      });

      // Set up an interval to send ball position data to clients
      const intervalId = setInterval(() => {
        let ballX = pongGame.getBallX();
        let ballY = pongGame.getBallY();
        let leftPaddle = pongGame.getLeftPaddle();
        let rightPaddle = pongGame.getRightPaddle();
        let rightPlayerScore = pongGame.getrRightPlayerScore();
        let leftPlayerScore = pongGame.getlLeftPlayerScore();

        server.to(roomName).emit('updateGame', {
          ballX,
          ballY,
          leftPaddle,
          rightPaddle,
          leftPlayerScore,
          rightPlayerScore,
        });

        if (!pongGame.getStatus()) {
          const info: ResultOfGame = {
            username:rootUser,
            competitor: friendUser,
          }
          const history: SetHistoryDto = {
              resulteOfCompetitor: leftPlayerScore,
              resulteOfUser: rightPlayerScore,
              username: rootUser,
              userCompetitor: friendUser,
            };
            this.addHistory(history);
            this.players.delete(roomName);
            clearInterval(intervalId);
          }
      }, 1000 / 100); // 100 frames per second
    }
  
   getUser(client: Socket){

      const jwtSecret = 'secrete';
      const token = client.handshake.headers.authorization;
  
      if (!token) {
        client.emit('error', 'Authorization token missing');
        client.disconnect(true);
        return;
      }
  
      let decodedToken = verify(token, jwtSecret);
      const username = decodedToken['username'];
      return username;
    }

    async checkRelatonStatus(rootUsername: string, friendUsername: string){
      try{
        const rootUser = await this.userRepository.findOne({
          where: {username: rootUsername},
        });
        const friendUser = await this.userRepository.findOne({
          where: {username: friendUsername}
        });
        if (!rootUser){
          throw new Error ("user not found !!");
        }

        const relationStatus = await this.relationRepository.findOne({
          where: [{user: {id: rootUser.id}, friend: {id: friendUser.id}, status: Not('blocked')},
          {friend: {id: rootUser.id}, user: {id: friendUser.id}, status: Not('blocked')}
        ]
        });
        if (!relationStatus){
          return (0);
        }
        return (1);
      }catch(error){
        throw new Error("Error check relation status")
      }
    }
  
    async matchingFriends(createGameDto: CreateGameDto, playerId: Socket, server: Server): Promise<void> {
      try {
        const user = await this.userRepository.findOne({
          where: { username: createGameDto.username }
        });
    
        const competitor = await this.userRepository.findOne({
          where: { username: createGameDto.friendUsername }
        });
    
        if (!user || !competitor) {
          throw new Error('User not found');
        }
    
        let roomName;
        
        // Check if there's an existing room, otherwise create a new one
        for (const [name, playWithFriend] of this.players) {
          if (playWithFriend.length < 2) {
            roomName = name;
            break;
          }
        }
    
        if (!roomName) {
          roomName = `room_${user.username}_${competitor.username}`;
        }
    
        // User joins the room
        playerId.join(roomName);
        // Competitor joins the room
        const competitorRoom = this.findCompetitorRoom(competitor.username);
        if (!competitorRoom) {
          throw new Error('Competitor socket room not found');
        }
        playerId.join(competitorRoom);
        if (!this.players.has(roomName)) {
          this.players.set(roomName, []);
        }
        this.players.get(roomName).push(user.username);
        // Emit an invitation to the competitor
        server.to(competitorRoom).emit('inviteFriend', { sender: user.username, roomName });
    
        // Listen for the response from the friend
        const responseListener = (response: { responseFromFriend: boolean }) => {
            // if (response.responseFromFriend == true){
              this.players.get(roomName).push(competitor.username);
            // }
            // else{
            //   playerId.removeListener('responseFromFriend', responseListener);
            // }
          // Check if there are now 2 players in the room
          if (this.players.get(roomName).length === 2) {
            playerId.removeListener('responseFromFriend', responseListener);
            this.startGame(roomName, playerId, server);
          }
        };
    
        playerId.on('responseFromFriend', responseListener);
    
      } catch (error) {
        console.error('Error in matchingFriends:', error);
        // Handle errors or send an error response to the client
      }
    }
    
    // Helper function to find the socket associated with a competitor
    private findCompetitorRoom(username: string): string | undefined {
      for (const [room, sockets] of this.isconnected) {
        if (room === username) {
          return room;
        }
      }
      return undefined;
    }
    
    
    private generateUniqueRoomName(user: User, competitor: User): string {
      let roomName = `room_${user.username}_${competitor.username}`;
      let count = 1;
      while (this.players.has(roomName)) {
        roomName = `room_${user.username}_${competitor.username}_${count}`;
        count++;
      }
      return roomName;
    }
    
    
    async addHistory(addhistory: SetHistoryDto): Promise<any> {
      try {
        const user = await this.userRepository.findOne({
          where: {username: addhistory.username}
        });
        const competitor = await this.userRepository.findOne({
          where: {username: addhistory.userCompetitor}
        });
    
        if (!user || !competitor) {
          throw new Error('User not found');
        }
        const newHistory = this.historyRepository.create({
         user: user,
         userCompetitor:competitor,
         resulteOfUser: addhistory.resulteOfUser,
         resulteOfCompetitor: addhistory.resulteOfCompetitor,
        });
         await this.historyRepository.save(newHistory);
        if (addhistory.resulteOfUser > addhistory.resulteOfCompetitor){
          this.updateWin(user.username);
          this.updateLos(competitor.username);
          this.updateXp(user.username);
          this.updateLevel(user.username);
          this.updateScore(user.username);
        }
        else{
          this.updateWin(competitor.username);
          this.updateLos(user.username);
          this.updateXp(competitor.username);
          this.updateLevel(competitor.username);
          this.updateScore(competitor.username);
        }
      } catch (error) {
        throw new Error('Failed to add history: ' + error.message);
      }
    }

    async updateWin(username: string): Promise<any>{
      try{
        const user = await this.userRepository.findOne({
          where: {username: username}
        });
        if (!user) {
          throw new Error('User does not exist');
        }
  
        const profile = await this.profileRepository.findOne({
          where:{user:{id: user.id}}
        });
        if (!profile) {
          throw new Error('profile does not exist');
        }
        let countWin = profile.win;
        countWin++;
        // console.log(countWin);
        profile.win = countWin;
        return await this.profileRepository.save(profile);
      } catch(error){
        throw new Error('Failed to update profile: '+ error.message);
      }
    }

    async updateLos(username: string): Promise<any>{
      try{
        const user = await this.userRepository.findOne({
          where: {username: username}
        });
        if (!user) {
          throw new Error('User does not exist');
        }
  
        const profile = await this.profileRepository.findOne({
          where:{user:{id: user.id}}
        });
        if (!profile) {
          throw new Error('profile does not exist');
        }
        let countLos = profile.los;
        countLos++;
        profile.los = countLos;
        return await this.profileRepository.save(profile);
      } catch(error){
        throw new Error('Failed to update profile: '+ error.message);
      }
    }

    async updateXp(username: string): Promise<any>{
      try{
        const user = await this.userRepository.findOne({
          where: {username: username}
        });
        if (!user) {
          throw new Error('User does not exist');
        }
  
        const profile = await this.profileRepository.findOne({
          where:{user:{id: user.id}}
        });
        if (!profile) {
          throw new Error('profile does not exist');
        }
        let xp = profile.xp;
        const win = profile.win;
        if (win % 2 == 0){
          xp += 2;
        }
        profile.xp = xp;
        return await this.profileRepository.save(profile);
      } catch(error){
        throw new Error('Failed to update profile: '+ error.message);
      }
    }

    async updateScore(username: string): Promise<any>{
      try{
        const user = await this.userRepository.findOne({
          where: {username: username}
        });
        if (!user) {
          throw new Error('User does not exist');
        }
  
        const profile = await this.profileRepository.findOne({
          where:{user:{id: user.id}}
        });
        if (!profile) {
          throw new Error('profile does not exist');
        }
        let score = profile.score;
        const win = profile.win;
        if (score != 0 && win % 2 == 0){
          score *= 3;
        }else{
          score += 1;
        }
        profile.score = score;
        return await this.profileRepository.save(profile);
      } catch(error){
        throw new Error('Failed to update profile: '+ error.message);
      }
    }

    async updateLevel(username: string): Promise<any>{
      try{
        const user = await this.userRepository.findOne({
          where: {username: username}
        });
        if (!user) {
          throw new Error('User does not exist');
        }
  
        const profile = await this.profileRepository.findOne({
          where:{user:{id: user.id}}
        });
        if (!profile) {
          throw new Error('profile does not exist');
        }
        let level = profile.level;
        const win = profile.win;
        if ( level != 0 && win % 2 == 0){
          level *= 2;
        }else {
          level += 1;
        }
        profile.level = level;
        return await this.profileRepository.save(profile);
      } catch(error){
        throw new Error('Failed to update profile: '+ error.message);
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
            where: { user: {id: user.id} }
          });
      
          if (existingRequest) {
            throw new Error('A request has already been sent');
          }
      
          const createHistory = this.historyRepository.create({
            user: user,
            userCompetitor: friend,
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
            where:{user:{id: user.id}}
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
              userCompetitor: { id: friend.id }
            }
          });
      
          if (!request) {
            throw new Error('Game request not found');
          }
      
          const acceptedRequest = await this.historyRepository.save(request);
          return acceptedRequest;
        } catch (error) {
          throw error;
        }
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

async addUserWithSocketId(playerId: Socket) {
  try {
    const jwtSecret = 'secrete';
    // Extract the JWT token
    const token = playerId.handshake.headers.authorization;

    if (!token) {
      playerId.emit('error', 'Authorization token missing');
      playerId.disconnect(true);
      return;
    }
    // Verify the JWT token using the secret
    let decodedToken;
    try {
      decodedToken = verify(token, jwtSecret);
    } catch (error) {
      playerId.emit('error', 'Invalid authorization token');
      playerId.disconnect(true);
      return;
    }

    const username = decodedToken['username'];
    const user = await this.userRepository.findOne({
      where: { username: username }
    });

    if (!user) {
      playerId.emit('error', 'User does not exist');
      playerId.disconnect(true);
      return;
    }
    // Join the user to a room based on their username
    if (!this.isconnected.has(username)) {
      this.isconnected.set(username,[]);
    }
    this.isconnected.get(username).push(playerId);

    for (const [key, value] of this.isconnected) {
      // console.log(username);
      for (const socket of value) {
        // console.log(socket.id);
      }
    }
    
    // Handle user disconnection and remove them from the map
    playerId.on('disconnect', () => {
      if (this.isconnected.has(username)) {
        this.isconnected.delete(username);
      }
    });
  } catch (error) {
    throw error;
  }
}
isconnected: Map<string, Socket[]> = new Map<string, Socket[]>();
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
    this.paddleSpeed = 10;
    this.ballRadius = 10;
    this.ballSpeedX = 5;
    this.ballSpeedY = 5;
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
  // if (this.ballY > this.leftPaddle + this.paddleHeight / 2) {
  //     this.leftPaddle += this.paddleSpeed;
  // } else if (this.ballY < this.leftPaddle + this.paddleHeight / 2) {
  //     this.leftPaddle -= this.paddleSpeed;
  // }
  // if (this.ballY > this.rightPaddle + this.paddleHeight / 2) {
  //     this.rightPaddle += this.paddleSpeed;
  // } else if (this.ballY < this.rightPaddle + this.paddleHeight / 2) {
  //     this.rightPaddle -= this.paddleSpeed;
  // }

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
      this.isGameOver();
  } else if (this.rightPlayerScore === 5) {
      this.player = 'right player';
      this.resetGame();
      this.isGameOver();
  }
  }

  resetGame() {
   this.ballX =this.canvasWidth / 2;
   this.ballY =this.canvasHeight / 2;
   this.ballSpeedX = -this.ballSpeedX;
   this.ballSpeedY = Math.random() * 10 - 10;
  }
 
  getBallX() :number{
    return this.ballX;
  }

  getBallY() :number{
    return this.ballY;
  }

  getLeftPaddle() :number{
    return this.leftPaddle;
  }

  getRightPaddle() :number{
    return this.rightPaddle;
  }

  setUpPressed(up: boolean){
  this.upPressed = up;
  }

  setDownPressed(down: boolean){
    this.downPressed = down;
  }

  setWPressed (w: boolean){
    this.wPressed = w;
  }

  setSPressed (s: boolean){
    this.sPressed = s;
  }
  getlLeftPlayerScore(): number{
    return this.leftPlayerScore;
  }
  getrRightPlayerScore(): number{
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
          }, 1000 / 100);
      }
  }

  isGameOver(): boolean {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      // this.leftPlayerScore = 0;
      // this.rightPlayerScore = 0;
      return true;
    }
    return false; 
  }
  
}

