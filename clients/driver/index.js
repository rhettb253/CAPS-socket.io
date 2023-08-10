const { io } = require("socket.io-client");
const pickupHandler = require('./handler');

const client = io("ws://localhost:3000/caps");

//function handlePickup(payload) {
//     pickupHandler(payload, client)
// }
client.on('pickup', (payload) => pickupHandler(payload, client));