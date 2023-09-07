export class UpdateGameDto {
    GameId: number;
    user: string;
    userCompetitor: string;
    leftPaddle: number;
    rightPaddle: number;
    paddleWidth: number;
    ballSpeedX: number;
    ballSpeedY: number;
    paddleHeight: number;
    ballRadius: number;
    paddleSpeed: number;
    upPressed: boolean;
    downPressed: boolean;
    wPressed: boolean;
    sPressed: boolean;
    score: number;
    ballX: number;
    ballY: number;
    rightPlayerScore:number;
    leftPlayerScore: number;
    player: string;
    canvasHeight:number;
    canvasWidth:number;
    finished:boolean;
}
