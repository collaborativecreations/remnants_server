// handler for /api/*

var Template = (function(name) {
	return {	
		index: function(req, res, next) {
			res.send('Index for '+name);
		},
	};
});

var Player = Template('player');
var Faction = Template('faction');
var Item = Template('item');

module.exports = {
	player: Player,
	faction: Faction,
	item: Item
};

