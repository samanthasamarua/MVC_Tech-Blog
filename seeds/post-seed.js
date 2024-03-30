const { post } = require('../models');


const postData = [
  {
    "title": "Why MVC is so important",
    "text": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
    "date_created": "01/01/24",
    "user_id": 1,
  },
  {
    "title": "Authentication vs Authorisation",
    "text": "There is a difference between authentication and authorisation. Authentication means confirming your own identity, whereas authorisation means being allowed access to the system",
    "date_created": "02/01/24",
    "user_id": 2,
  },
  {
    "title": "Object-Relational Mapping",
    "text": "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
    "date_created": "03/01/24",
    "user_id": 3,
  },
]

const seedPost = async () => {
  try {
    const result = await post.bulkCreate(postData, { logging: console.log });
    console.log('Insertion successful:', result);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

module.exports = seedPost;