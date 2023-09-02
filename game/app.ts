// init canvas
const cnvs = document.getElementById('canvas') as HTMLCanvasElement;
let cntx:any;
if (cnvs.getContext){
    cntx = cnvs.getContext('2d') as CanvasRenderingContext2D;
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

function drawObject(){
    // method clears an area of the canvas
    cntx.clearRect(0, 0, cnvs.width, cnvs.height);

    // color and style of ad
    cntx.fillStyle = '#ffffff';
    cntx.font = 'small-caps 18px Arial';

    //  draw the line
    cntx.beginPath();
    cntx.moveTo(cnvs.width / 2, 0);
    cntx.lineTo(cnvs.width / 2, cnvs.height);
    cntx.strokeStyle = '#ffffff';
    cntx.stroke();
    cntx.closePath();

    // draw the ball
    cntx.beginPath();
    cntx.arc(ball_X, ball_Y, ballRadius, 0, 6.28318530718);
    cntx.fill();
    cntx.closePath();

    // draw right paddle
    cntx.fillRect(cnvs.width - paddleWidth, rightPaddle, paddleWidth, paddleHeight);
    // draw right paddle
    cntx.fillRect(0, leftPaddle, paddleWidth, paddleHeight);

}

drawObject();