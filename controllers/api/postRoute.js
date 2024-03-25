const router = require('express').Router();
const { post, comment } = require('../../models');

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
router.post('/create', async (req, res) => {
  try {
    const newPost = await post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
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
