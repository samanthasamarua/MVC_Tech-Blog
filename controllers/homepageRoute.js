const router = require('express').Router();
const { post, comment, user } = require('../models');
const withAuth = require('../utils/auth');


// Route to get all posts
router.get('/', async (req, res) => {
    try {
            const postData = await post.findAll({
              include: [
              {
                model: user,
                attributes: ['username'],
              },
              ],
            });

            const posts = postData.map((post)=> post.get({plain:true}))
            console.log(posts)
        res.render('homepage',{
            posts
        })
     
    } catch (err) {
      console.error("Error occurred while fetching posts:", err);
      res.status(500).json(err);
    }   
  });

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const postData = await post.findAll({
        where: {
          user_id: req.session.userId,
        },
        include: [
        {
          model: user,
          attributes: ['username'],
        },
        ],
      });

      const posts = postData.map((post)=> post.get({plain:true}))
      console.log(posts)
      res.render('dashboard',{
      posts
     });
  
     
    } catch (err) {
      console.error("Error occurred while fetching posts:", err);
      res.status(500).json(err);
    }
  });

router.get('/add', async (req, res) => {
  try {
      res.render('add-post')
    
  } catch (err) {
    console.error("Error occurred while fetching posts:", err);
    res.status(500).json(err);
  }
});
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn ) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('signup');
  });

module.exports = router;