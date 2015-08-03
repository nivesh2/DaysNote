var express = require('express');
var router = express.Router();
var user = require('../functions/logic/user');

router.get('/signUp',user.signUp);
router.get('/update_password',user.update_password);
router.get('/deactivate',user.deactivate);

module.exports = router; 

