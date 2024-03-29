const router = require('express').Router();
const Post = require('../../models/Post.js');
const User = require('../../models/User.js');
const Comment = require('../../models/Comment.js');
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
    // Use async/await to await the completion of Post.findAll()
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

    // Check if any posts were found
    if (dbPostData.length === 0) {
      res.status(404).json({ message: 'No posts found!' });
      return;
    }

    // Send the post data as JSON response
    res.status(200).json(dbPostData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Route to render a specific post with associated comments and user
router.get('/:id', async (req, res) => {
  try {
    // Find a specific post by primary key, including associated comments and user
    const dbPostData = await Post.findByPk(req.params.id, {
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
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });


    // If no post is found with the given id, return a 404 status
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // Get plain data for the post
    const post = dbPostData.get({ plain: true });

    // Render the 'post' view with the post and logged-in status
    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Log and handle errors during data retrieval or rendering
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
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

router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
