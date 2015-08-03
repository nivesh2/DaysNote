var db = require('./dbAccess');

var dbHelper={
	validateKey : function(username,callback){
		db.validateKey(username,function (params) {
			callback(params);
		});
	},
	//for SignUp
	userNameCheck:function(username,callback){
		db.userNameCheck(username,function (params) {
			callback(params);
		});
	},
	emailCheck:function(email,callback){
		db.userEmailCheck(email,function (params) {
			callback(params);
		});
	},	
	addNewUser:function(user,callback){
		db.addNewUser(user,function (params) {
			callback(params);
		});
	},

	//for User Module
	deleteUser:function(username,callback){
		//delete module
	},	
	updateUser:function(user,callback){
		//update email module
	},
	
	//for Note Module
	createNote:function(note,callback){
		db.createNote(note,function(param){
			callback(param);
		});
	},
	deleteNote:function(note,callback){
		// note has options: By Date,Day,Month,Year,User
	},
	editNote:function(note,callback){
		
	},
	getNote:function(note,callback){
		// note has options: By Date,Day,Month,Year,User
	}				
	
	
};

module.exports=dbHelper;