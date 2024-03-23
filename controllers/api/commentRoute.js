const router = require('express').Router();
const {user, post, comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Route handler fetch all comments 

router.get('/', async (req, res) => {
  try {
    const commentData = await comment.findAll({});
    if (commentData.length === 0) {
      res
        .status(404)
        .json({ message: 'No comments found' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
}); 

// Route handler for retrieving a specific comment for the database based on its ID.

router.get('/:id', async (req, res) => {
    try {
      const commentData = await comment.findByPk(req.params.id);
      
      if (!commentData) {
        return res.status(404).json({ message: `There is no comments with id = ${req.params.id}` });
      }
      
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// Route handler for creating a new post. Checks if user is logged in

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Route handler is responsible for updating a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
      // Find the comment by its ID
      const commentData = await comment.findByPk(req.params.id);
  
      // If the comment doesn't exist, return a 404 Not Found error
      if (!commentData) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Check if the current user is the author of the comment
      if (commentData.user_id !== req.session.user_id) {
        return res.status(403).json({ message: 'You are not authorized to update this comment' });
      }
  
      await commentData.update(req.body);
  
      res.status(200).json(comment);
    } catch (err) {
      res.status(400).json({ message: 'Failed to update comment', error: err.message });
    }
  });

  // Route handler is responsible for deleting a comment by ID

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentDataa);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;