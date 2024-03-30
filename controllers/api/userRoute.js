const router = require('express').Router();
const { user } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/users', async (req, res) => {
  try {
    const userData = await user.findAll();

    if (!userData || userData.length === 0) {
      // If no users are found, respond with an appropriate message
      res.status(404).json({ message: 'No users found' });
      return;
    }

    // If users are found, respond with the user data
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route for user sign-up
router.post('/signup', withAuth, async (req, res) => {
  try {
    // Create a new user with the plain text password
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password // Pass the plain text password here
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
router.post('/login', withAuth, async (req, res) => {
  try {
    // Find the user by their email address
    const userData = await user.findOne({ where: { email: req.body.email } });

    console.log('userData:', userData);

    // If the user is not found, return an error
    if (!userData) {
      res.status(400).json({ message: 'No user with that email address! Try again' });
      return;
    }

    // Check if the provided password matches the hashed password in the database
    const isValidPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, return an error
    if (!isValidPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
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
