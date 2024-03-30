const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoute = require('./homepageRoute.js');


router.use('/api', apiRoutes);

// Log the request URL to track which route is being accessed
router.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next(); // Pass control to the next middleware function
});

router.use('/', homepageRoute);

router.use((req, res) => {
    console.log('Wrong route accessed:', req.originalUrl);
    res.send("Wrong Route!");
});


module.exports = router;