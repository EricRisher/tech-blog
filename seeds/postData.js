const { Post } = require('../models');

const postData = [
  {
    title: 'Test Post 1',
    content: 'This is a test post',
    user_id: 1,
  },
  {
    title: 'Test Post 2',
    content: 'This is another test post',
    user_id: 1,
  },
  {
    title: 'Test Post 3',
    content: 'This is yet another test post',
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;