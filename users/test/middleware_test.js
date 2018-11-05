const mongoose = require('mongoose');
const assert = require('assert')
const User = require('../src/users');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is great', content: 'It might not'});

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save(),])
      .then(() => done());
  });

it('user clean up danling blogposts on remove', (done) => {
  joe.remove()
    .then (() => BlogPost.count())
    .then ((count) => {
      assert(count === 0);
      done();
    });
});
});
