const assert = require('assert');
const User = require('../src/users');

describe('Subdocuments',() => {
  it('Can create Subdocuments',(done) => {
    const joe = new User({
      name: 'Joe' ,
      posts: [{title: 'PostTitle'}]
    });
    joe.save()
      .then (() => User.findOne({ name: 'Joe' }))
      .then ((user) => {
        assert(user.posts[0].title = 'PostTitle');
        done();
      })
  });

  it('Can add Subdocuments to an existing record', (done) => {
    const joe =  new User({
      name: 'Joe',
      posts: []
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New post'});
        return user.save();
      })
      .then (() => User.findOne({ name: 'Joe' }))
      .then ((user) => {
        assert(user.posts[0].title === 'New post')
        done();
      });
  });
  it('Can remove existing Subdocuments', (done) => {
    const joe = new User ({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });



});
