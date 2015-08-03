/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.Json());
app.use(bodyParser.urlencoded({ extended: false }));

//validate request
app.all('/api/v1/*', [require('./middleware/validateRequest')]);

//route the request
app.use('/api/v1/*', require('./routes/baseRoute'));


// catch 404 and forward to respective handler
app.use(function(req,res,next){
	var err= new Error('Not Found');
	err.status=404;
	next(err); 
});

// Dev error handler
if (app.get('env') === 'development') {
	app.use(function(err,req,res,next){
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });			
	});
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports=app;

