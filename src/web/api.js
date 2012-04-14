// handler for /api/*
var db = require(__dirname + '/../db');

// Default handler for the assorted actions
var Template = (function(name) {
	return {	
		index: function(req, res, next) {
            var send = function(err, data) {
                res.json({'list': data})
            }
            db['Index' + name](send)
		},
	};
});

// Object specific overrides go here
var Player = Template('Player');

var Faction = Template('faction');
var Item = Template('item');

module.exports = {
	player: Player,
	faction: Faction,
	item: Item
};

