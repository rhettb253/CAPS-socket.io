const { io } = require("socket.io-client");
// const { packageQueue, driverQueue } = require('../../hub/index');

function pickupHandler(payload, client) {
  console.log("DRIVER: picked up order " + payload.data.orderId);
  payload.event = "in-transit";
  client.emit("in-transit", payload);
  setTimeout(() => {
  console.log("DRIVER: delivered " + payload.data.orderId);
  payload.event = "delivered";
    client.emit("delivered", payload);
    client.emit('ready');
  }, 2000)
}

//every 6 seconds a new driver will start driving
//driver will look for pickup events
//there will be a max of 3 drivers
function createDriver() {
  let count = 0;
  const intervalId = setInterval(() => {
    if (count >= 2) {
      clearInterval(intervalId);
    }
    const client = io("ws://localhost:3000/caps");
    client.on('pickup', (payload) => pickupHandler(payload, client));
    client.emit('ready');
    count++;
    console.log(`Driver ${count} started driving.`);
  }, 6000);
}

module.exports = {pickupHandler, createDriver };
