// init canvas
const cnvs = document.getElementById('canvas') as HTMLCanvasElement;
if (cnvs.getContext){
    const cntx = cnvs.getContext('2d') as CanvasRenderingContext2D;
}

// define ball properties
const ball_X: number = cnvs.width / 2;
const ball_Y: number = cnvs.height / 2;
const ballRadius: number = 10;
const ballSpeed_X: number = 10;
const ballSpeed_Y: number = 10;

// define paddle properties
const paddleHeight: number = 100;
const paddleWidth: number = 10;
const leftPaddle: number = cnvs.height / 2 - paddleHeight / 2;
const rightPaddle: number = leftPaddle;
 
// define score properties
let firstPlayerScore: number = 0;
let scondPlayerScore: number = 0;
const maxPlayerScore: number = 8;

