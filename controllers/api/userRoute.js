const router = require('express').Router();
const { user } = require('../../models');
const bcrypt = require('bcrypt');

// Route for user sign-up
router.post('/signup', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    
    // Create a new user with the hashed password
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    // Set the session data to indicate that the user is logged in
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Find the user by their email address
    const userData = await user.findOne({ where: { email: req.body.email } });

    // If the user is not found, return an error
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password!' });
      return;
    }

    // Check if the provided password matches the hashed password in the database
    const isValidPassword = await bcrypt.compare(req.body.password, userData.password);

    // If the password is invalid, return an error
    if (!isValidPassword) {
      res.status(400).json({ message: 'Incorrect email or password!' });
      return;
    }

    // Set the session data to indicate that the user is logged in
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      req.session.username = userData.username;
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
