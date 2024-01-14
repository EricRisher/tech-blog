const router = require('express').Router();
const { Post } = require('../../models/Post.js');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(dbPostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
