// handler for /api/*

module.exports = {
	index: function(req, res, next) {
		res.send('This was an api triumph');
	},
};


