

function sendMsg(message: string) {
  socket.emit("createGame", message);
}

// Establish a socket.io connection
const socket = io("http://localhost:3001");

// Attach the click event handler to the button
const startButton = document.getElementById("start-btn") as HTMLButtonElement;
startButton.addEventListener("click", () => {
  sendMsg("hhhhhhh");
});
