const assert = require('assert');
const User = require('../src/users');

describe('Virtual Type', () => {
  it('Postcount return number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(joe.postCount === 1);
        done();
      });

  });
});
