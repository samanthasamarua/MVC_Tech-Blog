const router = require('express').Router();
const {user, post, comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find all posts created by the logged-in user
      const postData = await post.findAll({
        where: { user_id: req.session.user_id }, // Filter by user_id
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
          {
            model: comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: user,
              attributes: ['username'],
            },
          },
          {
            model: user,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into the template
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in,
        username: req.session.username,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Route to update a user's post
router.put('/:id', withAuth, async (req, res) => {
    try {
      // Find the post by its ID
      const post = await Post.findByPk(req.params.id);
  
      // If the post doesn't exist, return a 404 Not Found error
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the current user is the author of the post
      if (post.user_id !== req.session.user_id) {
        return res.status(403).json({ message: 'You are not authorized to update this post' });
      }
  
      // Update the post with the new data
      await post.update(req.body);
  
      // Return the updated post
      res.status(200).json(post);
    } catch (err) {
      // If an error occurs, return a 500 Internal Server Error response
      res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
  });

  // Route to delete a user's post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      // Find the post by its ID
      const post = await Post.findByPk(req.params.id);
  
      // If the post doesn't exist, return a 404 Not Found error
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the current user is the author of the post
      if (post.user_id !== req.session.user_id) {
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
      }
  
      // Delete the post
      await post.destroy();
  
      // Return a success message
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      // If an error occurs, return a 500 Internal Server Error response
      res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
  });


  module.exports = router;