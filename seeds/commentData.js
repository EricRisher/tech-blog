const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 1,
    comment_text: 'This is a test comment',
  },
  {
    user_id: 2,
    post_id: 2,
    comment_text: 'This is another test comment',
  },
  {
    user_id: 2,
    post_id: 3,
    comment_text: 'This is yet another test comment',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;