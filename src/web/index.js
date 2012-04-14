/*
 *
 * Initialize the web server / url routing
 *
 */

var config = require(__dirname + '/../config'),
	express = require('express');


module.exports = function() {
	var app = express.createServer();

	app.use(express.logger());
	app.use(express.bodyParser());
	//app.use(express.router());

	// Set up error handlers
	app.configure(function(){
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	// Root fetcher thing
	app.get('/', function(req, res, next) {
		res.redirect('/admin/');
	});
	
	// admin bitch!
	app.get('/admin/*?', function(req, res, next) {
		res.send('This was an administrative triumph');
	});
	
	// api bitch!
	app.get('/api/*?', function(req, res, next) {
		res.send('This was an api triumph');
	});
	
	// player bitzh!
	app.get('/player/*?', function(req, res, next) {
		res.send('This was a player triumph');
	});
	
	// 404!
	app.get('/*', function(req, res, next) {
		res.redirect('http://en.wikipedia.org/wiki/HTTP_404');
	});

	app.listen(config.port);
	console.log('listening on port ' + config.port);
	
	return app;
};

