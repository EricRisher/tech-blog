const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  Post.findAll({
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
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  Post.findOne({
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
  }).then((postData) => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }
    const post = postData.get({ plain: true });
    res
      .render('edit-post', {
        post,
        loggedIn: true,
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
});

router.get('/create/', withAuth, (req, res) => {
  Post.findAll({
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
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('create-post', {
        posts,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
