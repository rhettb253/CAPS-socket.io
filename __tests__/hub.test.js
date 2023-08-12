const {
    startSocketServer,
    hubPickupHandler,
    io,
    caps,
  } = require('../hub');

  describe('test hub functionality', ()=>{

    test('starts the socket server and logs that it connected', ()=>{
        const mockLog = jest.spyOn(console, 'log');
        startSocketServer();
        expect(mockLog).toHaveBeenCalledWith('The Socket Server has started!');
    });

    test('hubPickupHandler takes in and emits a payload', ()=>{
        const payload = { event: 'pickup', orderId: 1 };
        let spyEmit = jest.spyOn(caps, 'emit');
        hubPickupHandler(payload);
        expect(spyEmit).toHaveBeenCalledWith('pickup', payload);
    })

   io.close() 
  })
  