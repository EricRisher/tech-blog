const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      //logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;