const router = require('express').Router();
const { post } = require('../../models');
const withAuth = require('../../utils/auth');


// Route to create a new post
router.post('/', withAuth, async (req, res) => {

  try {
    // Retrieve the user ID from the session or request object
    const userId = req.session.userId; // Adjust this based on how the user ID is stored in the session
    
    // Create a new post with the user ID included
    const newPost = await post.create({...req.body, userId});
    console.log('Here is the new post', newPost);
    
    res.status(200).json(newPost);
  } catch (err) {
    console.error('Failed', err);
    res.status(500).json({ error: 'Failed to create new post' });
  }
});






module.exports = router;
