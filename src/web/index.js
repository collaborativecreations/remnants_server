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
	
    // static up.
    var doStatic = function(path) {
     	app.get('/' + path + '/*', function(req, res, next) {
            req.url = '/' + req.params[0]
            express.static(__dirname + '/' + path)(req,res,next);
        })};
	
    doStatic('admin');
    doStatic('player');

	// api bitch!
	app.resource('api/player', require('./api').player);
	app.resource('api/item', require('./api').item);
	app.resource('api/faction', require('./api').faction);
    app.get('/api/everything', function(req, res, next) {
        var send = function(everything) {
            res.send(everything);
        };        
        db.GetEverything(send);
    });
	
	// 404!
	app.get('/*', function(req, res, next) {
		res.send('What the fuck is this shit');
	});

	app.listen(config.port);

    // setup the socket
    var io = socketio.listen(app);

    var clients = [];
    
    io.sockets.on('connection', function(socket){
        clients.push(socket);
        var dumpdb = function(everything) {
            socket.emit('db', everything);
        };
        db.GetEverything(dumpdb);
        socket.on('disconnect', function(ev){
            var sock = socket;
            for(var i = 0; i < clients.length; ++i) {
                if(clients[i] == sock)
                {
                    clients.splice(i, i);
                    return;
                }
            }
        });
    });
    
	console.log('listening on port ' + config.port);
	
	return app;
};

