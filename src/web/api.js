// handler for /api/*


// Default handler for the assorted actions
var Template = (function(name) {
	return {	
		index: function(req, res, next) {
			res.send('Index for '+name);
		},
	};
});

// Object specific overrides go here
var Player = Template('player');
Player.index = function(req, res, next) {
	res.send('Dude, this player is so hawt');
};

var Faction = Template('faction');
var Item = Template('item');

module.exports = {
	player: Player,
	faction: Faction,
	item: Item
};

