// handler for /api/*
var db = require(__dirname + '/../db');

// Default handler for the assorted actions
var Template = (function(name) {
	return {	
		index: function(req, res, next) {
            var send = function(err, data) {
                res.json({'list': data})
            };
            db[name].Index(send);
		},
        create: function(req, res, next) {
            var send = function(err, data) {
                res.status = 201;
                res.json(data);
            };

            db[name].Add(req.body, send);
        },
        delete: function(req, res, next) {
            var send = function(err) {
                res.json({});
            };
            db[name].Delete(req.params[name], send);
        },
        show: function(req, res, next) {
            var send = function(err, obj) {
                res.json(obj);
            };
            db[name].Get(req.params[name], send);
        },
        update: function(req, res, next) {
            var send = function(err, obj) {
                res.json(obj);
            };
            db[name].Update(req.params[name], req.body, send);
        }
	};
});

// Object specific overrides go here
var Player = Template('player');

var Faction = Template('faction');
var Item = Template('item');

module.exports = {
	player: Player,
	faction: Faction,
	item: Item
};

