const { User } = require('../models/User.js');

const userData = [
  {
    username: 'blogger91',
    email: 'blogger91@email.com',
    password: 'myblogpass',
  },
  {
    username: 'codeWizard',
    email: 'codeWizard@example.com',
    password: 'secureTech123',
  },
  {
    username: 'fitExplorer',
    email: 'fitExplorer@mail.com',
    password: 'healthylife567',
  },
  {
    username: 'globeTrekker',
    email: 'trekkingWorld@gmail.com',
    password: 'travelDreams99',
  },
  {
    username: 'snapshotMaster',
    email: 'snapshotMaster@photohub.com',
    password: 'captureLife78',
  },
  {
    username: 'foodieAdventurer',
    email: 'foodieAdventurer@yahoo.com',
    password: 'tastyEats2022',
  },
  {
    username: 'artCreator',
    email: 'artCreator@creative.com',
    password: 'myArtisticPass',
  },
  {
    username: 'melodyChaser',
    email: 'melodyChaser@mailbox.com',
    password: 'musicIsLife22',
  },
  {
    username: 'bookNerd',
    email: 'bookNerd@example.org',
    password: 'readMoreBooks!',
  },
  {
    username: 'gameMaster',
    email: 'gameMaster@gamingworld.com',
    password: 'playHard987',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
