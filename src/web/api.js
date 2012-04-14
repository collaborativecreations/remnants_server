// handler for /api/*

var Player = {
	index: function(req, res, next) {
		res.send('Index for Player');
	},
}
var Faction = {
	index: function(req, res, next) {
		res.send('Index for Faction');
	},
}
var Item = {
	index: function(req, res, next) {
		res.send('Index for Item');
	},
}


module.exports = {
	player: Player,
	faction: Faction,
	item: Item
};

