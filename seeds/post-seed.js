const { post } = require('../models');


const postData = [
  {
    "title": "Test 1",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliquai",
    "date_created": "01/01/24",
    "user_id": 1,
  },
  {
    "title": "Test 2",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliquai",
    "date_created": "02/01/24",
    "user_id": 2,
  },
  {
    "title": "Test 3",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliquai",
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