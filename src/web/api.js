// handler for /api/*
var db = require(__dirname + '/../db');

// Default handler for the assorted actions
var Template = (function(name) {
	return {	
		index: function(req, res, next) {
            var send = function(err, data) {
                if(err)
                    res.send(404);
                else
                    res.json({'list': data})
            };
            db[name].Index(send);
		},
        create: function(req, res, next) {
            var send = function(err, data) {
                if(err)
                    res.send(400);
                else
                    res.json(data, 201);
                
            };

            db[name].Add(req.body, send);
        },
        destroy: function(req, res, next) {
            var send = function(err) {
                if(err)
                    res.send(400);
                else
                    res.json({});
            };
            db[name].Delete(req.params[name], send);
        },
        show: function(req, res, next) {
            var send = function(err, obj) {
                if(err)
                    res.send(404);
                else
                    res.json(obj);
            };
            db[name].Get(req.params[name], send);
        },
        update: function(req, res, next) {
            var send = function(err) {
                if(!err){
                    res.json({});
                } else {
                    res.send(404);
                }
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