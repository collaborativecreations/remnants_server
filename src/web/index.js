/*
 *
 * Initialize the web server / url routing
 *
 */

var CornerCut = require('CornerCut');
var config = require(__dirname + '/../config');


module.exports = function() {
	var cornercut = new CornerCut;

	cornercut.add(require('./routes')());

	cornercut.createServer(config.port);
    console.log('listening on port ' + config.port);
};

