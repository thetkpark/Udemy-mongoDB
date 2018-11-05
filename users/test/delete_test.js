const assert = require('assert');
const User = require('../src/users');

describe('Deleting the user', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then (() => done());
  });
it('model instance remove', (done) => {
      joe.remove()
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
          assert(user === null);
          done();
        });
    });
it('Class mothod remove', (done) => {
  //Remove a bunch of record with some given criteria
  User.remove({ name: 'Joe' })
  .then(() => User.findOne({ name: 'Joe' }))
  .then((user) => {
    assert(user === null);
    done();
  });
});
it('Class method findOneAndRemove', (done) => {
  User.findOneAndRemove({ name: 'Joe' })
  .then(() => User.findOne({ name: 'Joe' }))
  .then((user) => {
    assert(user === null);
    done();
  });
});
it('Class method findByIdAndRemove', (done) => {
  User.findByIdAndRemove(joe._id)
  .then(() => User.findOne({ name: 'Joe' }))
  .then((user) => {
    assert(user === null);
    done();
  });
});

});
