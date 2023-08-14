"use strict";

const { Server } = require("socket.io");
const { Queue, logIt } = require("./handlers");

//socket server instance
const io = new Server();
io.listen(3000);

//namespace
const caps = io.of("/caps");

//queues
const driverQueue = new Queue();
const packageQueue = new Queue();

function hubPickupHandler(payload) {
  if (driverQueue.isEmpty()) {
    packageQueue.enqueue(payload);
    console.log(`Order ${payload.data.orderId} is waiting for an eligible driver`);
  } else {
    const driver = driverQueue.dequeue();
    driver.emit(payload.event, payload);
  }
  logIt(payload);
}

function hubDeliveredHandler(payload) {
  logIt(payload);
  caps.emit(payload.event, payload);
}

function hubReadyHandler(socket) {
  if (packageQueue.isEmpty()) {
    driverQueue.enqueue(socket);
    console.log(`Driver ${socket.id} is waiting for a package`);
  } else {
    socket.emit("pickup", packageQueue.dequeue());
  }
}

function handleConnection(socket) {
  console.log("We have a new connection: " + socket.id);
  //   logIt on all event occurrences
  //   socket.on("pickup", logIt);
  socket.on("ready", () => hubReadyHandler(socket));
  socket.on("pickup", hubPickupHandler);
  socket.on("in-transit", logIt);
  socket.on("delivered", hubDeliveredHandler);
}

function startSocketServer() {
  console.log("The Socket Server has started!");
  // connection in a sense is a magic word than knows to react or listen to any client connect made. A socket obj will be passed on connection.
  caps.on("connection", handleConnection);
}

module.exports = {
  startSocketServer,
  hubPickupHandler,
  hubDeliveredHandler,
  packageQueue,
  driverQueue,
  io,
  caps,
};
