function sendMsg(message) {
    socket.emit("createGame", message);
}
// Establish a socket.io connection
var socket = io("http://localhost:3001");
// Attach the click event handler to the button
var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", function () {
    sendMsg("hhhhhhh");
});
