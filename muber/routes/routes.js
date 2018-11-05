const DriverController = require ('../controllers/driver_controllers');

module.exports = (app) => {
  //Watch for incoming request of 'get' to the http://localhost:3050/api
  app.get('/api', DriverController.greeting);

  app.post('/api/drivers', DriverController.create);

  app.put('/api/drivers/:id', DriverController.edit);

  app.delete('/api/drivers/:id', DriverController.delete);

  app.get('/api/drivers/', DriverController.index);

};
