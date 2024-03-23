const router = require('express').Router();
const {user, post, comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route retrieves all posts from the database along with associated user information and comments
router.get('/', async (req, res) => {
    try {
        const postData = await post.findAll({
            attributes: ['id', 'title', 'text', 'date_created'],
            order: [['date_created', 'DESC']],
            include: [
                { model: user, 
                    attributes: ['name'] },
                { model: comment,
                    attributes: ['text', 'post_id', 'user_id', 'date_created'],
                    include: { model: user, 
                    attributes: ['name'] }
                }
            ]
        });

        res.status(200).json(postData.reverse());
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route retrieves a specific post based on id
router.get('/:id', async (req, res) => {
    try {
        const postData = await post.findByPk({
            where: { id: req.params.id},
            attributes: ['id', 'title', 'text', 'date_created'],
            order: [['date_created', 'DESC']],
            include: [
                { model: user, 
                    attributes: ['name'] },
                { model: comment,
                    attributes: ['text', 'post_id', 'user_id', 'date_created'],
                    include: { model: User, attributes: ['name'] }
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: `no post with id = ${req.params.id}` });
            return;
          }

        res.status(200).json(postData.reverse());
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route handler is responsible for creating a new post. Checks is user is logged in

router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });


// Route handler is responsible for updating a post
router.put('/:id', withAuth, async (req, res) => {
    try {
      // Find the post by its ID
      const postData = await post.findByPk(req.params.id);
  
      // If the post doesn't exist, return a 404 Not Found error
      if (!postData) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the current user is the author of the post
      if (postData.user_id !== req.session.user_id) {
        return res.status(403).json({ message: 'You are not authorized to update this post' });
      }
  
      await postData.update(req.body);
  
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({ message: 'Failed to update post', error: err.message });
    }
  });



// Route handler is responsible for deleting a post by id 

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;