const router = require('express').Router();
const { Comment } = require('../../models/Comment.js');
const { User } = require('../../models/User.js');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  try {
    Comment.findAll({
      attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
