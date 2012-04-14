/*
 *
 * Initialize the web server / url routing
 *
 */

var CornerCut = require('CornerCut');

module.exports = function() {
	var cornercut = new CornerCut;

	cornercut.add(require('./routes')());

	cornercut.createServer(8080);
};

