const router = require('express').Router();
const { post, comment, user } = require('../models');


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
// Route to access dashboard
  router.get('/dashboard', async (req, res) => {
    try {
      const postData = await post.findAll({
        include: [
          {
            model: user,
            attributes: ['username'],
          },
        ],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', {
        posts,
        // Pass the logged in flag to the template
        loggedin: req.session.loggedin,
      });
    } catch (err) {
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
  
// 
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