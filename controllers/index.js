const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoute = require('./dashboardRoute.js');


router.use('./api', apiRoutes);

router.use('.dashboard', dashboardRoute);

router.use((req, res) => {
    res.send("Wrong Route!");
  });
  

module.exports = router;
