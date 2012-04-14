/*
 *
 * Initialize the web server / url routing
 *
 */

var config = require(__dirname + '/../config'),
	express = require('express');


module.exports = function() {
	var app = express.createServer();

	app.get('/', function(req, res){
		res.send('This was a triumph');
	});

	app.listen(config.port);
	console.log('listening on port ' + config.port);
	
	return app;
};

