import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
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
import { verify } from 'jsonwebtoken';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { PongGame } from './pong-game/pong-game';


@Injectable()
export class GameService {
  players: Map<string, string[]> = new Map<string, string[]>();
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)private profileRepository: Repository<Profile>,
    @InjectRepository(Relation)private relationRepository: Repository<Relation>,
    @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
    @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
    @InjectRepository(ChatRoom)private chatRepository: Repository<ChatRoom>,
    ) {}

    async createGameRandom(createGameDto: CreateGameDto, playerId: Socket, server: Server,  pongGame: PongGame): Promise<void> {
      try {
        // Find the user in the database
        const user = await this.userRepository.findOne({
          where: { username: createGameDto.username },
        });
        if (!user) {
          throw new Error('User does not exist');
        }
    
        // Check if the user is already in a room
        let roomName = '';
        for (const [name, players] of this.players) {
          if (players.includes(user.username)) {
            roomName = name;
            break;
          }
        }

        if (roomName && this.players.get(roomName).length >= 2) {
          await playerId.join(roomName);
        } else {
          // Find a room with available space or create a new one
          const maxPlayersPerRoom = 2;
          for (const [name, players] of this.players) {
            if (players.length < maxPlayersPerRoom && name !== user.username) {
              roomName = name;
              break;
            }
          }
    
          if (!roomName) {
            roomName = user.username;
          }
          await playerId.join(roomName);
    
          if (!this.players.has(roomName)) {
            this.players.set(roomName, []);
          }
        }
    
        this.players.get(roomName).push(user.username);
    
        if (this.players.get(roomName).length === 2) {
          if (this.players.get(roomName)[0] === user.username)
          {
            await this.handleLeaveRoom(playerId, roomName);
          }
          else{
            await this.startGame(roomName, playerId, server, pongGame);
          }
        } else {
          playerId.on('cancelGame', async () => {
            await this.handleLeaveRoom(playerId, roomName);
          });
        }
      } catch (error) {
        console.error('Error in createGameRandom:', error);
        throw error;
      }
    }
    

  async getGameRoom(username: string): Promise<any>{
    try{
      for (const [name, players] of this.players) {
        for(const player of players)
        {
          if (player === username) {
            return name;
          }
        }
      }
      return null;
    }catch(error){
      throw new Error("...");
    }
  }

   async handleLeaveRoom(client: Socket, roomName: string) {
       
      client.leave(roomName);
      if (this.players.has(roomName)) {
        this.players.delete(roomName);
      }
    }

    async statusInGame(username: string) :Promise<any> {
      try{
        const user = await this.userRepository.findOne({where: {username: username}});
        if (!user){
          throw new Error("user not found");
        }
        user.status = 'inGame';
        return await this.userRepository.save(user);
      }catch(error){
        throw error;
      }
    }

    async statusOutGame(username: string) {
      try{
        const user = await this.userRepository.findOne({where: {username: username}});
        if (!user){
          throw new Error("user not found");
        }
        user.status = 'online';
        return await this.userRepository.save(user);
      }catch(error){
        throw error;
      }
    }

    async waitMinute(): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 6000);
      });
    }

    async startGame(roomName: string, playerId: Socket, server: Server, pongGame: PongGame): Promise<void> {
      const [rootUser, friendUser] = this.players.get(roomName);
      await this.setStatusOfUser(playerId, rootUser);
      await this.setStatusOfUser(playerId, friendUser);
      const user = await this.userRepository.findOne({where: {username: rootUser}});
      const userFriend = await this.userRepository.findOne({where: {username: friendUser}});
      // Emit the initial player information to clients
      server.to(roomName).emit('players', {
        user,
        userFriend,
      });

      await this.waitMinute();
      // Create a PongGame instance and start the game
       pongGame.start();
      // send game state updates to clients
      const intervalId = setInterval(async () => {
        const gameData = {
          ballX: pongGame.getBallX(),
          ballY: pongGame.getBallY(),
          leftPaddle: pongGame.getLeftPaddle(),
          rightPaddle: pongGame.getRightPaddle(),
          leftPlayerScore: pongGame.getlLeftPlayerScore(),
          rightPlayerScore: pongGame.getrRightPlayerScore(),
        };

        server.to(roomName).emit('GameUpdated', gameData);
        if (!pongGame.getStatus()) {
          clearInterval(intervalId);
          if (pongGame.winnerPlayer === 'right'){
            server.to(roomName).emit('gameOver', {
              gameOver: true, winner: user, loser: userFriend, 
              winnerScore: pongGame.getrRightPlayerScore(),
              loserScore: pongGame.getlLeftPlayerScore(),
            });
          }
          if (pongGame.winnerPlayer === 'left')
          {
            server.to(roomName).emit('gameOver', {
              gameOver: true, winner: userFriend,loser: user, 
              winnerScore: pongGame.getlLeftPlayerScore(),
              loserScore: pongGame.getrRightPlayerScore(),
            });
          }

         // clean up and add result to db
          const history: SetHistoryDto = {
            resulteOfCompetitor: gameData.leftPlayerScore,
            resulteOfUser: gameData.rightPlayerScore,
            username: rootUser,
            userCompetitor: friendUser
          };

        await this.handleLeaveRoom(playerId, roomName);
        await this.addHistory(history);
        pongGame.leftPlayerScore = 0;
        pongGame.rightPlayerScore = 0;
       }
      }, 1000 / 60);
    }

    
   async getUser(client: Socket){

      const jwtSecret = process.env.JWT_SECRET;
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
        const user = await this.userRepository.findOne({where: { username: createGameDto.username }});
        const competitor = await this.userRepository.findOne({where: { username: createGameDto.friendUsername }});
        if (!user || !competitor) {
          throw new Error('User or competitor not found');
        } 
        let competitorRoom = competitor.username;
        for (const [room, sockets] of this.isconnected) {
          if (room === competitor.username) {
            for(const socket of sockets){
              socket.join(competitorRoom);
            }
          }
        }
        // emit an invitation to the competitor
        server.to(competitorRoom).emit('inviteFriend', { sender: user, receiver: competitor});
      } catch (error) {
        console.error('Error in matching friends:', error);
      }
    }
    
    async acceptRequest(acceptRequestDto: AcceptRequestDto, playerId: Socket, server: Server,  pongGame: PongGame) :Promise<any>{
      try{
       const user = await this.userRepository.findOne({where:{username: acceptRequestDto.username}});
       const competitor = await this.userRepository.findOne({where:{username: acceptRequestDto.userCompetitor}})
       if (!user || !competitor){
        throw new Error("User not found!");
       }
      let roomName = `room_${user.username}_${competitor.username}`;

      if (!this.players.get(roomName)){
        this.players.set(roomName, []);
      }
      
      this.players.get(roomName).push(user.username);
      this.players.get(roomName).push(competitor.username);

      // competitor and user joins the room
      let competitorRoom = competitor.username;
      for (const [room, sockets] of this.isconnected) {
        if (room === competitor.username) {
          for(const socket of sockets){
            socket.join(roomName);
            socket.join(competitorRoom);
          }
        }
      }

      for (const [room, sockets] of this.isconnected) {
        if (room === user.username) {
          for(const socket of sockets){
            socket.join(roomName);
          }
        }
      }

      if (this.players.get(roomName).length === 2){
        server.to(competitorRoom).emit('acceptrequest',{sender: user});
        this.startGame(roomName, playerId, server, pongGame);
      }

      }catch(error){
        throw new Error('Unable to accept the request.')
      }
    }

    async rejectrequest(acceptRequestDto: AcceptRequestDto, playerId: Socket, server: Server) :Promise<any>{
      try{
        const user = await this.userRepository.findOne({where:{username: acceptRequestDto.username}});
        const competitor = await this.userRepository.findOne({where:{username: acceptRequestDto.userCompetitor}})
        if (!user || !competitor){
         throw new Error("User not found!");
        }

       // competitor and user joins the room
       let competitorRoom = competitor.username;
       for (const [room, sockets] of this.isconnected) {
         if (room === competitor.username) {
           for(const socket of sockets){
             socket.join(competitorRoom);
           }
         }

        server.to(competitorRoom).emit('rejectrequest',{sender: user});
       }
 
       }catch(error){
         throw new Error('Unable to accept the request.')
       }
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
         await this.updateWin(user.username);
         await this.updateLos(competitor.username);
         await this.updateXp(user.username);
         await this.updateLevel(user.username);
        }
        else{
         await this.updateWin(competitor.username);
         await this.updateLos(user.username);
         await this.updateXp(competitor.username);
         await this.updateLevel(competitor.username);
        }
        
       await this.updateScore(competitor.username);
       await this.updateScore(user.username);
        return
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
        const winCount = profile.win;
        let xp = profile.xp;
    
        if (winCount % 2 === 0) {
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
       score++;
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
        const winCount = profile.win;
        if (winCount % 2 === 0) {
          level *= 2;
        } else {
          level += 1;
        }
        profile.level = level;
        return await this.profileRepository.save(profile);
      } catch(error){
        throw new Error('Failed to update profile: '+ error.message);
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

async handleConnection(socketId: Socket, username:string) {
  try {
    if (!this.isconnected.has(username)) {
      this.isconnected.set(username,[]);
    }
    this.isconnected.get(username).push(socketId);
    socketId.on('disconnect', async () => {
      if (this.isconnected.has(username)) {
        this.isconnected.delete(username);
      }
    });
  } catch (error) {
    socketId.emit('error', 'Authentication failed');
    socketId.disconnect(true);
  }
}

async setStatusOfUser(socketId: Socket, username:string) {
  try {
   
    const user = await this.userRepository.findOne({
      where: {username: username}
    });
    user.status = 'inGame';

    await this.userRepository.save(user);
    socketId.on('disconnect', async () => {
      user.status = 'online';
      await this.userRepository.save(user);
    });
  } catch (error) {
    socketId.emit('error', 'Authentication failed');
    socketId.disconnect(true);
  }
}

async refreshGame(socketId: Socket){
  try{
    const jwtSecret = process.env.JWT_SECRET;
    const token = socketId.handshake.headers.authorization;
    if (!token) {
      socketId.emit('error', 'Authorization token missing');
      socketId.disconnect(true);
      return;
    }
    let decodedToken = verify(token, jwtSecret);
    const username = decodedToken['username'];
    let roomName = null;
    for (const [name, players] of this.players) {
      if (players.includes(username)) {
        roomName = name;
        break;
      }
    }
      for (const [room, sockets] of this.isconnected) {
        if (room === username) {
          for(const socket of sockets){
            socket.join(roomName);
          }
        }
      }

  }catch (error) {
    socketId.emit('error', 'Authentication failed');
    socketId.disconnect(true);
  }
}

isconnected: Map<string, Socket[]> = new Map<string, Socket[]>();
}
