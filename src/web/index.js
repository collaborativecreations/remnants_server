/*
 *
 * Initialize the web server / url routing
 *
 */

var config = require(__dirname + '/../config'),
	express = require('express'),
    db = require(__dirname + '/../db');


module.exports = function() {
	var app = express.createServer();

    db();

	app.get('/', function(req, res){
        // db.AddFaction({name : 'faketion'}, function(err, fact) {
        //     db.AddPlayer({
        //         name : 'Namey',
        //         faction : fact,
        //         inventory : [],
        //         stats : {
        //             Health : 0,
        //             Manliness: 1, 
        //             Womanliness: 2
        //         }}, function(err, player) {
        //             res.send(player)
        //     });
        // });
        res.send('poop!');
	});


	app.listen(config.port);
	console.log('listening on port ' + config.port);
	
	return app;
};

