const router = require('express').Router();
const { post } = require('../models');

// Route to get all posts of a user
router.get('/dashboard/:userId', async (req, res) => {
  try {
    const userPosts = await post.findAll({
      where: {
        user_id: req.params.userId
      }
    });
    res.status(200).json(userPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to update a post by id
router.put('/dashboard/:userId/update/:postId', async (req, res) => {
  try {
    const updatedPost = await post.update(req.body, {
      where: {
        id: req.params.postId,
        user_id: req.params.userId
      }
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to delete a post by id
router.delete('/dashboard/:userId/delete/:postId', async (req, res) => {
  try {
    const deletedPost = await post.destroy({
      where: {
        id: req.params.postId,
        user_id: req.params.userId
      }
    });
    res.status(200).json(deletedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
