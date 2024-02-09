const router = require('express').Router();
const User = require('../../models/User.js');
const Post = require('../../models/Post.js');
const Comment = require('../../models/Comment.js');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', async (req, res) => {
  try {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.params.id },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'created_at'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title'],
          },
        },
      ],
    }).then((userData) => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
      }
      res.status(200).json(userData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    }).then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post('/login', async (req, res) => {
  try {
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((userData) => {
      if (!userData) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }
      const validPassword = userData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    User.update(req.body, {
      individualHooks: true,
      where: { id: req.params.id },
    }).then((userData) => {
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
      }
      res.status(200).json(userData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    User.destroy({
      where: { id: req.params.id },
    }).then((userData) => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
      }
      res.status(200).json(userData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
