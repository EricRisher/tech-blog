const router = require('express').Router();
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

// Route to render the homepage with all posts and associated user and comments
router.get('/', async (req, res) => {
  try {
    // Fetch all posts with associated user and comments, ordered by creation date
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    // Map the plain data to create an array of posts
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'homepage' view with posts and logged-in status
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    // Log and handle errors during data retrieval or rendering
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  // Render the 'login' view
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  // Render the 'signup' view
  res.render('signup');
});

// Export the router
module.exports = router;
