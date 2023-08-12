"use strict";

const { Server } = require("socket.io");

//socket server instance
const io = new Server();
io.listen(3000);

//namespace
const caps = io.of("/caps");

function hubPickupHandler(payload){
    logIt(payload);
    caps.emit(payload.event, payload)
}

function hubDeliveredHandler(payload){
    logIt(payload);
    caps.emit(payload.event, payload)
}

// on this assignment I onlt used caps.emit() - to talk to all sockets
// socket.emit() does the same thing (same with socket.on()) - but only talks to one socket
// example: socket.emit("pickup", { message: "pickup acknowledged" });
// have to pass socket as second arguement after payload in handleConnection function like this:
// socket.on(events.pickup, (payload) => handlePickupReady(payload, socket));

function handleConnection(socket) {
  console.log("We have a new connection: " + socket.id);
//   logIt on all event occurrences
//   socket.on("pickup", logIt);
  socket.on("pickup", hubPickupHandler);
  socket.on("in-transit", logIt);
  socket.on("delivered", hubDeliveredHandler);
}

function startSocketServer() {
  console.log("The Socket Server has started!");
  // connection in a sense is a magic word than knows to react or listen to any client connect made. A socket obj will be passed on connection.
  caps.on("connection", handleConnection);
}

function logIt(payload) {
  console.log("Event:", payload.event);
  console.log("Current time:", getCurrentTime());
  console.log("Payload: ", payload.data);
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;
  return currentTime;
}

module.exports = {
  startSocketServer,
  hubPickupHandler,
  logIt,
  hubDeliveredHandler,
  io,
  caps
};
