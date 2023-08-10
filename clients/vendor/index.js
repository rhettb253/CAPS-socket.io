'use strict';

const Chance = require('chance');
const thankYou = require('./handler');
const {io} = require('socket.io-client');

const client = io('ws://localhost:3000/caps');

// Instantiate Chance so it can be used
const chance = new Chance();

let store = 'Code Academy Parcel Service';
let orderId = chance.string({ length: 8 });
let customer = chance.name();
let address = chance.address({ short_suffix: true });

client.emit('pickup', {
    event: 'pickup',
    data: {
      store,
      orderId,
      customer,
      address,
    },
  });

client.on('delivered', thankYou);
