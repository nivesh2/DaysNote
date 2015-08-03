var dbHelper=require('../database/dbHelper');
var debug = require('debug')('UserAction');
var jwt = require('jwt-simple');

var user={
	signUp:function(req,res){
		var username = req.body.username || req.query.username || '';
		var phoneid = req.body.phoneid || req.query.phoneid ||'';
		var email = req.body.email || req.query.email ||'';
		
		if (username==''||phoneid==''||email=='') {
			res.status(401);
			res.json({
				"status":401,
				"message":"All fields are mandatory."
			});
			return;
		}
		var user = {
					"username":username,
					"phoneid":phoneid,
					"email":email,
					"role":"user"
					};
		
		dbHelper.addNewUser(user,function(inserted){ 
			debug('New User added: '+ inserted);
			if(inserted){
				res.json({
					"status":200,
					"message":"success"
				});
				
			}else{
				res.json({
					"status":200,
					"message":"failure"
				});
			}
		});
	},
	
	update_password:function(req,res){
		
	},
	
	deactivate:function(req,res){
		
	}	
};



module.exports=user;