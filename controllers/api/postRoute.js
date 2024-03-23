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
        const postData = await post.findOne({
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
            res.status(404).json({ message: `no posts with id = ${req.params.id}` });
            return;
          }

        res.status(200).json(postData.reverse());
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route that creates a post

// Route that updates a post

// Delete a post by id