const router = require('express').Router();
const { post, comment, user } = require('../models');

// Route to get all posts
router.get('/', async (req, res) => {
    try {
            const postData = await post.findAll();
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

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard')
     
    } catch (err) {
      console.error("Error occurred while fetching posts:", err);
      res.status(500).json(err);
    }
  });

  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }
  
    res.render('login');
  });

module.exports = router;