const assert = require('assert');
const User = require('../src/users');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;
  beforeEach((done) => {
    alex = new User ({ name: 'Alex' });
    maria = new User ({ name: 'Maria' });
    zach = new User ({ name: 'Zach' });
    joe = new User ({ name: 'Joe' });

    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
      .then(() => done());
  });
  it ('Finds all users with a name of Joe', (done) => {
    User.find({ name: 'Joe' })
      .then ((users) => {
        console.log(users[0]._id);
        console.log(joe._id);
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });
  it ('Find a user with particular ID', (done) => {
    User.findOne({ _id: joe._id })
     .then ((user) => {
       assert(user.name === 'Joe');
       done();
     });
  });
  it('Can skip and limit the result set', (done) => {
    // -Alex- [Joe,Maria] -Zach-
    User.find({})
    .sort({ name: 1 }) //sort assending (a -> Z)
    .skip(1)
    .limit(2)
    .then((users) => {
      assert(users.length === 2);
      assert(users[0].name === 'Joe');
      assert(users[1].name === 'Maria');
        done();
      });

  });

});
