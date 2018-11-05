const mongoose = require('mongoose');
const assert = require('assert')
const User = require('../src/users');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is great', content: 'It might not'});
    comment = new Comment({content: 'Wow that is great'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost',(done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('saves a full relation graph',(done) => {
    User.findOne({ name: 'Joe' }) //find user
      .populate({
        path: 'blogPosts', //inside that user look for blogPosts and load up property
        populate: { //inside that path look for comment and load up property
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }

        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is great');
        assert(user.blogPosts[0].comments[0].content === 'Wow that is great');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      })
  });
});
