const { Post } = require('../models/Post.js');

const postData = [
  {
    title: 'Exploring the Power of Progressive Web Apps (PWAs)',
    content:
      'Dive into the features and benefits of Progressive Web Apps, discussing how they enhance user experience and engagement.',
    user_id: 1,
  },
  {
    title: 'The Rise of DevOps in Modern Software Development',
    content:
      'Explore the principles and practices of DevOps, highlighting its significance in streamlining collaboration between development and operations teams.',
    user_id: 2,
  },
  {
    title: 'Understanding Blockchain Technology and its Applications',
    content:
      'Provide a comprehensive overview of blockchain, covering its underlying concepts, decentralized nature, and real-world applications beyond cryptocurrencies.',
    user_id: 3,
  },
  {
    title:
      'Leveraging Artificial Intelligence for Enhanced User Personalization',
    content:
      'Discuss how AI algorithms are transforming user experiences by providing personalized recommendations, content, and services across various platforms.',
    user_id: 4,
  },
  {
    title: 'Navigating the World of Cybersecurity Threats',
    content:
      'Shed light on the current landscape of cybersecurity threats, offering insights into common attack vectors, preventive measures, and the importance of cybersecurity in todays digital age.',
    user_id: 5,
  },
  {
    title: 'The Impact of 5G Technology on Internet of Things (IoT)',
    content:
      'Explore how the rollout of 5G networks is revolutionizing IoT, enabling faster and more reliable communication between connected devices.',
    user_id: 6,
  },
  {
    title: 'Decoding Quantum Computing: A New Era in Information Processing',
    content:
      'Delve into the principles of quantum computing, explaining how it differs from classical computing and its potential implications for various industries.',
    user_id: 7,
  },
  {
    title: 'Building Scalable Microservices Architecture',
    content:
      'Guide developers through the design and implementation of scalable microservices architecture, emphasizing best practices and real-world use cases.',
    user_id: 8,
  },
  {
    title: 'The Evolution of Virtual Reality (VR) and Augmented Reality (AR)',
    content:
      'Trace the evolution of VR and AR technologies, discussing their current state, applications, and potential future developments in entertainment, education, and beyond.',
    user_id: 9,
  },
  {
    title: 'Sustainable Technology: Green Innovations for a Better Future',
    content:
      'Explore how technology is contributing to sustainability efforts, showcasing innovations that address environmental challenges and promote eco-friendly practices.',
    user_id: 10,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
