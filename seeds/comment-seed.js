const { comment } = require('../models');


const commentData = [
    {
        text: 'This is the first comment.',
        user_id: 1, // Assuming user with ID 1 exists
        post_id: 1, // Assuming post with ID 1 exists
      },
      {
        text: 'Great post!',
        user_id: 2, // Assuming user with ID 2 exists
        post_id: 1, // Assuming post with ID 1 exists
      },
      {
        text: 'Great post!',
        user_id: 3, // Assuming user with ID 2 exists
        post_id: 1, // Assuming post with ID 1 exists
      },
]

const seedComment = () => comment.bulkCreate(commentData);

module.exports = seedComment;