const assert = require('assert');
const User = require('../src/users');

describe('Updateing record', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then (() => done());
  });

function assertName (operation, done){
  operation
  .then (() => User.find({}))
  .then ((users) => {
    assert(users.length === 1);
    assert(users[0].name === 'Alex');
    done();
  });
}

it('instance type using set & save', (done) => {
  joe.set('name', 'Alex');
  joe.save()
  assertName(joe.save(), done);
});

it ('A model instance can update', (done) => {
  assertName(joe.update({ name: 'Alex' }), done);
});

it('A class model can update', (done) => {
  assertName(
    User.update({ name: 'Joe' }, { name: 'Alex' }),done
  );
});

it('A class model can update one record', (done) => {
  assertName(
    User.findOneAndUpdate({ name: 'Joe' }, {name: 'Alex'}), done
  );
});

it('A class model can find by ID and update', (done) => {
  assertName(
    User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done
  );
});

it('A user can have their postCount increase by 1',(done) => {
  User.update({ name: 'Joe' }, { $inc: {likes: 1} } )
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.likes === 1);
      done();
    })



});



});
//using 'xit' = this test won't run
