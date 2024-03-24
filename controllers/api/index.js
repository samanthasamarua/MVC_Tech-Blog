const router = require('express').Router();
const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');


router.use('/user', userRoutes);
router.use('/post', postRoutes);


module.exports = router;