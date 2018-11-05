const Driver = require('../models/drivers');

module.exports = {

  index(req, res, next){
    const { lng, lat } = req.query; //called querry string which store by express
    Driver.aggregate([
      {
        '$geoNear':{
            "near": {'type': 'Point', 'coordinates': [parseFloat(lng), parseFloat(lat)]},
            "spherical": true, "distanceField": 'dist', "maxDistance": 200000
        }
      }    
    ])
          .then(drivers => res.send(drivers))
          .catch(next);
  },

  greeting(req, res){
    res.send({ hi: 'there' });
  },

  create(req, res, next){
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);

  },

  edit(req, res, next){
    const driverID = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverID }, driverProps)
      .then(() => Driver.findById({ _id: driverID }))
      .then(driver => res.send(driver))
      .catch(next);

  },

  delete(req, res, next){
    const driverID = req.params.id;
    Driver.findByIdAndRemove({ _id: driverID })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }

};
