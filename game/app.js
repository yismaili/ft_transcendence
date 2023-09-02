"use strict";
// init canvas
const cnvs = document.getElementById('canvas');
let cntx;
if (cnvs.getContext) {
    cntx = cnvs.getContext('2d');
}
// define ball properties
const ball_X = cnvs.width / 2;
const ball_Y = cnvs.height / 2;
const ballRadius = 10;
const ballSpeed_X = 10;
const ballSpeed_Y = 10;
// define paddle properties
const paddleHeight = 100;
const paddleWidth = 10;
const leftPaddle = cnvs.height / 2 - paddleHeight / 2;
const rightPaddle = leftPaddle;
// define score properties
let firstPlayerScore = 0;
let scondPlayerScore = 0;
const maxPlayerScore = 8;
function drawObject() {
    // method clears an area of the canvas
    cntx.clearRect(0, 0, cnvs.width, cnvs.height);
    // color ann style of font
    cntx.fillStyle = '#ffffff';
    cntx.font = 'small-caps 18px Arial';
    // start a new path
    cntx.beginPath();
    // move the current drawing point to position(x, y)
    cntx.moveTo(cnvs.width / 2, 0);
    // draw a line to position(xn, yn)
    cntx.lineTo(cnvs.width / 2, cnvs.height);
    // set line color to white
    cntx.strokeStyle = '#ffffff';
    // stroke the path to make it visible on the canvas
    cntx.stroke();
    // close the path by connecting back to the starting point
    cntx.closePath();
    // draw the ball
    cntx.beginPath();
    cntx.arc(ball_X, ball_Y, ballRadius, 0, 6.28318530718);
    // fill the closed shape
    cntx.fill();
    cntx.closePath();
    // draw right paddle
    cntx.fillRect(cnvs.width - paddleWidth, rightPaddle, paddleWidth, paddleHeight);
    // draw right paddle
    cntx.fillRect(0, leftPaddle, paddleWidth, paddleHeight);
}
drawObject();
