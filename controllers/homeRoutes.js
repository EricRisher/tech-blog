const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Fetch all posts with associated user and comments
    const dbPostData = await Post.findAll({
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

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = dbPostData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;
