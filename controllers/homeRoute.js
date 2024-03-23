const router = require('express').Router();
const { user } = require('../models/user');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware

// withAuth - Needs to be logged, will run request if it is true. 
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await user.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((p) => post.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      // logs user in - variable 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  // If logged in, it will redirect to the homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
