const { user } = require('../models'); // Assuming your user model is exported as User

const userData = [
  {
    username: 'John Doe',
    email: 'john@example.com',
    password: 'password1', 
  },
  {
    username: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password2',
  },
  {
    username: 'Helen Smith',
    email: 'helen@example.com',
    password: 'password3',
  },
 
];

const seedUsers = () => user.bulkCreate(userData);

module.exports = seedUsers;
