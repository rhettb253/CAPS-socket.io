"use strict";

const Chance = require("chance");
const thankYou = require("./handler");
const { io } = require("socket.io-client");

const client = io("ws://localhost:3000/caps");

// Instantiate Chance so it can be used
const chance = new Chance();
setInterval(() => {
  let payload = {
    store: "Code Academy Parcel Service",
    orderId: chance.string({ length: 8 }),
    customer: chance.name(),
    address: chance.address({ short_suffix: true }),
  };

  client.emit("pickup", {
    event: "pickup",
    data: payload,
  });
}, chance.integer({ min: 5000, max: 10000 }));

client.on("delivered", thankYou);
