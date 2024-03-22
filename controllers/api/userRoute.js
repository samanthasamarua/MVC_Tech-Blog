// Import required modules
const express = require('express');
const router = express.Router();
const user = require('../../models/user');

// Defines a POST route at users for creating a new user. 
router.post('/', async (req, res) => {
    try {
        // user.create method is used to insert a new user to the database with the data provided in the request body.
      const userData = await user.create(req.body);
        // Saves the user's ID and sets the logged_in session to true
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // Defines a POST route for user log in
  router.post('/login', async (req, res) => {
    try {
        // Retrieves the user data based on the email provided in the request body
      const userData = await user.findOne({ where: { email: req.body.email } });
        // If user not found or password is incorrect, an error message is prompted
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
        // Validates the password
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      
      // Once users credentials are validated, save user session
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
    // Defines POST route at user logout
  router.post('/logout', (req, res) => {
    // If user is logged in - destroys the session and responds with a status code (no content)
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  