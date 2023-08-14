const {
    startSocketServer,
    hubPickupHandler,
    io,
    caps,
    packageQueue,
  } = require('../hub');
  const { Queue } = require('../hub/handlers');
  const payload = { event: 'pickup', data: {orderId: 1} };

  describe('test hub functionality', ()=>{

    test('starts the socket server and logs that it connected', ()=>{
        const mockLog = jest.spyOn(console, 'log');
        startSocketServer();
        expect(mockLog).toHaveBeenCalledWith('The Socket Server has started!');
    });

    test('hubPickupHandler adds to packageQueue when driverQueue is empty', ()=>{
        let driverQueue = new Queue();
        let spyLog = jest.spyOn(console, 'log');
        hubPickupHandler(payload);
        expect(spyLog).toHaveBeenCalledWith('Order 1 is waiting for an eligible driver');
    });

   io.close() 
  })
  