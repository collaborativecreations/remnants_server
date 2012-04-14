/*
 *
 * Initialize the web server / url routing
 *
 */

var config = require(__dirname + '/../config'),
	express = require('express'),
    db = require(__dirname + '/../db'),
    socketio = require('socket.io'),
    Resource = require('express-resource');


module.exports = function() {
    // initialize database.
    db();

	var app = express.createServer();

	app.use(express.logger());
	app.use(express.bodyParser());

	// Set up error handlers
	app.configure(function() {
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
	app.resource('api/player', require('./api').player);
	app.resource('api/item', require('./api').item);
	app.resource('api/faction', require('./api').faction);
    app.get('/api/everything', function(req, res, next) {
        console.log('ahhh!');
        var send = function(everything) {
            res.send(everything);
        };        
        db.GetEverything(send);
    });
	
	// player bitzh!
	app.get('/player/*?', function(req, res, next) {
		res.send('This was a player triumph');
	});
	
	// 404!
	app.get('/*', function(req, res, next) {
		res.send('What the fuck is this shit');
	});


	app.listen(config.port);
    io = socketio.listen(app);
    
    io.sockets.on('connection', function(socket){
        var dumpdb = function(everything) {
            socket.emit('db', everything);
        };
        db.GetEverything(dumpdb);
    });
    
	console.log('listening on port ' + config.port);
	
	return app;
};

