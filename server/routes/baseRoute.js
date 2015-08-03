var express = require('express');
var router = express.Router();


router.use('/user/*',require('userRoute.js'));
router.use('/note/*',require('noteRoute.js'));
router.use('/stats/*',require('statsRoute.js'));

module.exports=router;

































module.exports = router;

