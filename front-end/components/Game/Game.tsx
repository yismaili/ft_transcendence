import Style from "./Game.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocketContext } from "@/contexts/socket-context";
import ReactPlayer from "react-player";
import Winners from "./Winners/Winners";

export default function Game() {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();
  const [gameOver, setGameOver] = useState<gameOver>();
  const [map, setMap] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get("map");
    if (searchParams.get("map") === "SPACE") setMap("/img/game/SPACE.png");
    else if (searchParams.get("map") === "BEACH") setMap("/img/game/BEACH.png");
    else setMap("/img/gameMap/defaultMap.png");
  }, []);

  class Canvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null = null;

    constructor() {
      this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
      if (this.canvas) {
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas.width = 800;
        this.canvas.height = 600;
      }
    }

    getContext(): CanvasRenderingContext2D | null {
      return this.context;
    }

    clearCanvas() {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getWidth(): number {
      return this.canvas?.width;
    }

    getHeight(): number {
      return this.canvas?.height;
    }
  }

  class Ball {
    private x: number;
    private y: number;
    private radius: number;

    constructor(x: number, y: number, radius: number) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }

    draw(context: CanvasRenderingContext2D | null) {
      if (context) {
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
      }
    }
  }

  class Paddle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    draw(context: CanvasRenderingContext2D | null) {
      if (context) {
        context.fillStyle = "#ffffff";
        context.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  class MiddleLine {
    private firstPoint: number;
    private endPoint: number;

    constructor(firstPoint: number, endPoint: number) {
      this.firstPoint = firstPoint;
      this.endPoint = endPoint;
    }

    draw(context: CanvasRenderingContext2D | null) {
      if (context) {
        context.strokeStyle = "#ffffff";
        context.beginPath();
        context.moveTo(this.firstPoint, 0);
        context.lineTo(this.firstPoint, this.endPoint);
        context.stroke();
        context.closePath();
      }
    }
  }

  class Score {
    private leftPlayerScore: number;
    private rightPlayerScore: number;

    constructor(leftPlayerScore: number, rightPlayerScore: number) {
      this.leftPlayerScore = leftPlayerScore;
      this.rightPlayerScore = rightPlayerScore;
    }

    draw(context: CanvasRenderingContext2D | null) {
      if (context) {
        context.fillStyle = "#ffffff";
        context.font = "small-caps 18px Arial";
        context.fillText("" + this.leftPlayerScore, 300, 20);
        context.fillText("" + this.rightPlayerScore, 490, 20);
      }
    }
  }

  class PongGame {
    private canvas: Canvas;
    private ball: Ball;
    private leftPaddle_: Paddle;
    private rightPaddle_: Paddle;
    private middleLine: MiddleLine;
    private leftPlayerScore: number;
    private rightPlayerScore: number;
    private score: Score;
    private ballX: number;
    private ballY: number;
    private paddleHeight: number;
    private ballRadius: number;

    private leftPaddle: number;
    private rightPaddle: number;
    private paddleWidth: number;

    public socket: any;

    constructor() {
      this.canvas = new Canvas();
      this.ballX = this.canvas.getWidth() / 2;
      this.ballY = this.canvas.getHeight() / 2;
      this.ballRadius = 10;
      this.paddleHeight = 100;
      this.paddleWidth = 10;
      this.leftPlayerScore = 0;
      this.rightPlayerScore = 0;
      // init
      this.leftPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
      this.rightPaddle = this.canvas.getHeight() / 2 - this.paddleHeight / 2;
      this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
      this.leftPaddle_ = new Paddle(
        0,
        this.leftPaddle,
        this.paddleWidth,
        this.paddleHeight
      );
      this.rightPaddle_ = new Paddle(
        this.canvas.getWidth() - 10,
        this.rightPaddle,
        this.paddleWidth,
        this.paddleHeight
      );
      this.middleLine = new MiddleLine(
        this.canvas.getWidth() / 2,
        this.canvas.getHeight()
      );
      this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
      // Add keyboard event listeners

      document.addEventListener("keydown", this.keyDownHandler.bind(this));
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    private keyDownHandler(e: KeyboardEvent) {
      if (e.key === "ArrowUp")
        gameSocket.emit("updateGameUp", {
          isup: true,
          username: Data.response.user.username,
        });
      if (e.key === "ArrowDown")
        gameSocket.emit("updateGameDown", {
          isdown: true,
          username: Data.response.user.username,
        });
    }

    private keyUpHandler(e: KeyboardEvent) {
      if (e.key === "ArrowUp")
        gameSocket.emit("updateGameUp", {
          isup: false,
          username: Data.response.user.username,
        });
      if (e.key === "ArrowDown")
        gameSocket.emit("updateGameDown", {
          isdown: false,
          username: Data.response.user.username,
        });
    }

    draw() {
      this.canvas.clearCanvas();
      this.ball.draw(this.canvas.getContext());
      this.leftPaddle_.draw(this.canvas.getContext());
      this.rightPaddle_.draw(this.canvas.getContext());
      this.middleLine.draw(this.canvas.getContext());
      this.score.draw(this.canvas.getContext());
    }

    update() {
      // clean canvas
      this.canvas.clearCanvas();

      gameSocket.on(
        "GameUpdated",
        (response: {
          ballX: number;
          ballY: number;
          leftPaddle: number;
          rightPaddle: number;
          leftPlayerScore: number;
          rightPlayerScore: number;
        }) => {
          this.ballX = response.ballX;
          this.ballY = response.ballY;
          this.leftPaddle = response.leftPaddle;
          this.rightPaddle = response.rightPaddle;
          this.leftPlayerScore = response.leftPlayerScore;
          this.rightPlayerScore = response.rightPlayerScore;
        }
      );
      this.ball = new Ball(this.ballX, this.ballY, this.ballRadius);
      this.leftPaddle_ = new Paddle(
        0,
        this.leftPaddle,
        this.paddleWidth,
        this.paddleHeight
      );
      this.rightPaddle_ = new Paddle(
        this.canvas.getWidth() - 10,
        this.rightPaddle,
        this.paddleWidth,
        this.paddleHeight
      );
      this.middleLine = new MiddleLine(
        this.canvas.getWidth() / 2,
        this.canvas.getHeight()
      );
      this.score = new Score(this.leftPlayerScore, this.rightPlayerScore);
    }

    start() {
      this.update();
      this.draw();
    }
  }

  useEffect(() => {
    const pongGame = new PongGame();
    function call() {
      pongGame.start();
      window.requestAnimationFrame(call);
    }

    gameSocket.emit("refreshGame");
    gameSocket.on("gameOver", (response: gameOver) => {
      setGameOver(response);
      // console.log("gameOver res:", response);
    });

    window.requestAnimationFrame(call);
  }, []);

  return (
    <>
      <div className={`${Style.Game___container} container`}>
        {gameOver && (
          <div className={Style.video}>
            <ReactPlayer
              url={`${
                gameOver.winner.username === Data.response.user.username
                  ? "/img/game/winner.mp3"
                  : "/img/game/lost.mp3"
              }`}
              playing={gameOver ? true : false} // Set to true if you want the audio to auto-play
              controls={false} // Show player controls (play, pause, volume, etc.)
            />
          </div>
        )}
        {gameOver &&
          (gameOver.winner.username === Data.response.user.username ? (
            <p className={Style.win}>You win</p>
          ) : (
            <p className={Style.lost}>You lost</p>
          ))}

        {gameOver && (
          <>
            <button
              className={Style.homeBtn}
              onClick={() =>
                router.push(`/users/${Data.response.user.username}`)
              }
            >
              back to home
            </button>
            <button
              className={Style.mapsBtn}
              onClick={() =>
                router.push(`/users/${Data.response.user.username}/gameMap`)
              }
            >
              play Again
            </button>
          </>
        )}
        {!gameOver && (
          <canvas
            id="canvas"
            className={Style.Canvas}
            style={{
              backgroundImage: `url(${map})`,
            }}
          ></canvas>
        )}
        {gameOver && <Winners gameOver={gameOver} />}
      </div>
    </>
  );
}
