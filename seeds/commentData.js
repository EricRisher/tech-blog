const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 1,
    comment_text:
      'Great overview of the benefits of PWAs! Im excited to implement them in my projects.',
  },
  {
    user_id: 2,
    post_id: 2,
    comment_text:
      'DevOps has indeed become a game-changer. Thanks for breaking down its importance.',
  },
  {
    user_id: 3,
    post_id: 3,
    comment_text:
      'Blockchain is fascinating! Its amazing to see its potential beyond cryptocurrencies.',
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text:
      'AI personalization is transforming the way we interact with technology. Exciting times ahead!',
  },
  {
    user_id: 5,
    post_id: 5,
    comment_text:
      'Cybersecurity is a critical topic. Your insights on common threats are valuable for everyone.',
  },
  {
    user_id: 6,
    post_id: 6,
    comment_text:
      '5Gs impact on IoT is profound. The faster communication is a game-changer.',
  },
  {
    user_id: 7,
    post_id: 7,
    comment_text:
      'Quantum computing is mind-bending! Cant wait to see its applications unfold.',
  },
  {
    user_id: 8,
    post_id: 8,
    comment_text:
      'Microservices architecture is crucial for scalable applications. Thanks for the guidance!',
  },
  {
    user_id: 9,
    post_id: 9,
    comment_text:
      'VR and AR have come a long way. Exciting developments are on the horizon.',
  },
  {
    user_id: 10,
    post_id: 10,
    comment_text:
      'Sustainable tech is the need of the hour. Your examples showcase the positive impact of technology on the environment.',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
