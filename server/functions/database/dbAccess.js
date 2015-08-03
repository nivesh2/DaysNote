var pg = require('pg');
var config = require('config');

var conString = config.get('connectionString');

var db={	
	validateKey : function(key,callback){
		var query={
			"name":"validateKey",
			"text":"SELECT user_id FROM USER_TABLE WHERE USERNAME =$1",
			"values":[key]
		};
		
		dbConnect(query,function (result) {
			if (result === false) {
				callback(false);
			}else{
				callback(result.rows[0].user_id);
			}
		});	
	},
	userNameCheck : function(username,callback){
		var query={
			"name":"userEmailCheck",
			"text":"SELECT user_id FROM USER_TABLE WHERE USERNAME=$1",
			"values":[username]
		};
		dbConnect(query,function (result) {
			if (result === false) {
				callback(false);
			}else{
				callback(true);
			}
		});		
	},
	userEmailCheck : function(email,callback){
		var query={
			"name":"userEmailCheck",
			"text":"SELECT * FROM USER_TABLE WHERE EMAIL=$1",
			"values":[email]
		};
		dbConnect(query,function (result) {
			if (result === false) {
				callback(false);
			}else{
				callback(true);
			}
		});
	},
	addNewUser : function(user,callback){
		var query={
			"name":"addNewUser",
			"text":"INSERT INTO USER_TABLE(username,password,email) values ($1,crypt($2,gen_salt(\'bf\')),$3)",
			"values":[user.username,user.password,user.email]
		};
		
		dbConnect(query,function (result) {
			if (result === false) {
				callback(false);
			}else{				
				callback(true);
			}
		});		
	},
	createNote : function(note,callback){
		var query={
			"name":"createNote",
			"text":"INSERT INTO NOTE_TABLE(TEXT,TIME) VALUES ($1,$2) ",
			"values":[note.text,note.time]
		};
		dbConnect(query,function(result){
			if (result === false) {
					callback(false);
				}else{				
					callback(true);
			}				
		});
	},
	getNote : function(note,callback){
		
	}
};

function dbConnect(query,callback){
		pg.connect(conString,function (err,client,done) {			
			if(err){
				console.error('error fetching client from pool'.err);
				callback(false);				
			}else{
			client.query(query,function (err,result) {
				done();
				if (err) {
					console.error('error running query',err);
					callback(false);
				}else{
					if(result.rowCount==1){
						callback(result);
					}else{
						callback(false);
					}
				}
			});
			}
		});
}

module.exports = db;