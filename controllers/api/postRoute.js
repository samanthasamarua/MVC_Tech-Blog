const router = require('express').Router();
const { post, comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await post.findAll();
    console.log("Posts fetched successfully:", postData);
    res.status(200).json(postData);
  } catch (err) {
    console.error("Error occurred while fetching posts:", err);
    res.status(500).json(err);
  }
});

// Route to get a specific post by id
router.get('/:id', async (req, res) => {
  try {
    const postData = await post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new post
router.post('/', withAuth, async (req, res) => {

  try {
    // Retrieve the user ID from the session or request object
    const userId = req.session.userId; // Adjust this based on how the user ID is stored in the session
    
    // Create a new post with the user ID included
    const newPost = await post.create({
      ...req.body, userId
       // Include the user ID in the new post data
    });
    
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create new post' });
  }
});




// Route to update a post by id
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await post.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await post.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a comment on a post
router.post('/:id/comment', async (req, res) => {
  try {
    const newComment = await comment.create({
      ...req.body,
      post_id: req.params.id
    });
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
