const router = require('express').Router();
const { Post} = require('../models/Post.js');
const { User } = require('../models/User.js');
const { Comment } = require('../models/Comment.js');
const withAuth = require('../utils/auth');

// Route to get all posts for the logged-in user
router.get('/', async (req, res) => {
  try {
    // Find all posts for the logged-in user, including associated comments and users
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
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

    // Render the 'dashboard' view with posts and logged-in status
    res.render('dashboard', {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    // Log and handle errors
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the 'edit-post' view for a specific post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find a specific post for editing, including associated comments and users
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
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

    // If no post is found with the given id, return a 404 status
    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    // Get plain data for the post
    const post = postData.get({ plain: true });

    // Render the 'edit-post' view with the post and logged-in status
    res.render('edit-post', {
      post,
      loggedIn: true,
    });
  } catch (err) {
    // Log and handle errors during rendering
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the 'create-post' view for the logged-in user
router.get('/create/', withAuth, async (req, res) => {
  try {
    // Find all posts for the logged-in user, including associated comments and users
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
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

    // Render the 'create-post' view with posts and logged-in status
    res.render('create-post', {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    // Log and handle errors during rendering
    console.error(err);
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
