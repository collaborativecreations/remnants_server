// web routes!
var Routes = function(data) {
	return [{
		path: "/", // index
		target: __dirname+"/test",
		method: "test",
		httpCode: 200,
		headers: {'Content-Type': 'text/html'},
		data: data
	}];
};

module.exports = Routes;
