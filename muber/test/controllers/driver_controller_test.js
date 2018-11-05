const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('Driver Controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {

      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {

          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    })

  });

  it('PUT to /api/drivers/id edits and existing driver', done => {
    const driver = new Driver({ email: 't@t.com' , driving: false });

    driver.save().then(() => {
      request(app)
        .put('/api/drivers/' + driver._id) //old fasion way
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 't@t.com' })
            .then(driver => {
              assert(driver.driving === true);
              done();
            });
        });

    });

  });

  it('DELETE to /api/drivers/id can delete a driver', done => {
    const driver = new Driver({ email: 'test@test.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`) //same as above but in es6
        .end(() => {
          Driver.findOne({ email: 'test@test.com' })
            .then((driver) => {
              assert(driver === null);
              done();
            });
        });
    });
  });

  it('GET to /api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
    });
    
    Promise.all([ seattleDriver.save(), miamiDriver.save() ])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25') //add querry string in http request
          .end((err,response) => {
            assert(response.body.length === 1);
            assert(response.body[0].email === 'miami@test.com');
            done();
          });
      });

  });
});


