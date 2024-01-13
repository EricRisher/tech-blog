const { User } = require('../models');

const userData = [
  {
    username: 'admin',
    email: 'test@test.com',
    password: 'admin',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
