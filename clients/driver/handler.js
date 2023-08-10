function pickupHandler(payload, client) {
    console.log('DRIVER: picked up order ' + payload.data.orderId);
    payload.event = 'in-transit';
    client.emit('in-transit', payload);
    console.log('DRIVER: delivered ' + payload.data.orderId);
    payload.event = 'delivered';
    client.emit('delivered', payload);
  };

  module.exports = pickupHandler