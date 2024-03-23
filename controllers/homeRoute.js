const router = require('express').Router();
const { user, post, comment } = require('../models');
const withAuth = require('../utils/auth');

// Route retrieves all posts from the database along with associated user information and comments
router.get('/', async (req, res) => {
  try {
      const postData = await post.findAll({
          attributes: ['id', 'title', 'text', 'date_created'],
          order: [['date_created', 'DESC']],
          include: [
              { 
                  model: user, 
                  attributes: ['name'] 
              },
              { 
                  model: comment,
                  attributes: ['text', 'post_id', 'user_id', 'date_created'],
                  include: { 
                      model: user, 
                      attributes: ['name'] 
                  }
              }
          ]
      });

      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('homepage', { 
          posts, 
          logged_in: req.session.logged_in 
      });
  } catch (err) {
      res.status(500).json(err);
  }
});


// Route retrieves post based on user profile data

router.get('/:id', async (req, res) => {
  try {
    const postData = await post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'text', 'date_created'],
      include: [
        { 
          model: user, 
          attributes: ['name'] 
        },
        { 
          model: comment,
          attributes: ['text', 'post_id', 'user_id', 'date_created'],
          include: { 
            model: user, 
            attributes: ['name'] 
          }
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: `No post found with id = ${req.params.id}` });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/post', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await user.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: post }],
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});



module.exports = router;
