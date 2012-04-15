/*
 *
 * Public Persistence layer API
 *
 */


// define local variables up in here.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    inited = false;


// initialization
module.exports = function()
{
    if(inited) return;

    inited = true;
        
    mongoose.connect('mongodb://localhost/remnants_tag');

    ref = function(table) {
        return {type: Schema.ObjectId, ref: table};
    };

    var PlayerSchema = new Schema({
        name: {type : String, required : true},
        faction: ref('Faction'),
	    inventory: {type: [ref('Item')], default: []},
	    stats: {type: {
		    Health: Number,
            Manliness: Number,
            Womanliness: Number
	    }, required: true}
    });
    
    var FactionSchema = new Schema({
        name: {type: String, required: true}
    });

    var ItemSchema = new Schema({
	    name: {type: String, required: true},
	    type: {type: String, enum: [
            "armor",
            "weapon",
            "ammo",
            "onetime",
            "quest"
        ], default: "quest"},
	    buffs: {type: [{
		    stat: String,
		    buff: Number
        }], default: []}
    });

    var Player = mongoose.model('Player', PlayerSchema);
    var Item = mongoose.model('Item', ItemSchema);
    var Faction = mongoose.model('Faction', FactionSchema);

    var AddModel = function(model) {
        return function(obj, callback) {
            var modeledObject = new model(obj);
            modeledObject.save(function(err){
                callback(err, modeledObject);
            });
        };
    };
    
    var GetModel = function(model) {
        return function(id, callback) {
            model.findById(id, callback);
        };
    };

    var DeleteModel = function(model) {
        return function(id, callback) {
            model.findById(id, function(err, obj){
                if(!err)
                    obj.remove(callback);
                else
                    callback(err);
            });
        };
    };

    var UpdateModel = function(model) {
        return function(id, obj, callback) {
            options = {};
            model.update({'_id':id}, obj, options, function(err, num){
                if(num != 1)
                    err = 'whoa no object.';
                callback(err);
            });
        };
    };

    var IndexModel = function(model) {
        return function(callback){
            model.find({}, ['_id'], function(err, keyCollection) {
                if(!err)
                {
                    var keys = [];
                    keyCollection.forEach(function(dbKey){
                        keys.push(dbKey._id);
                    });
                    callback(err, keys);
                }
                else
                    callback(err);
            });
        };
    };

    var GetAllModels = function(model) {
        return function(callback) {
            model.find({}, function(err, coll) {
                if(!err)
                {
                    var objs = [];
                    coll.forEach(function(obj) {
                        objs.push(obj);
                    });
                    callback(err, objs);
                }
                else
                    callback(err);
            });
        };
    };

    // now add all the methods.
    var Models = {
        'player' : Player,
        'faction' : Faction,
        'item' : Item
    };

    for(var model in Models) if(Models.hasOwnProperty(model)) {
        module.exports[model] = {};

        var AddMethod = function(prefix, func) {
            module.exports[model][prefix] = func(Models[model]);
        };
        var Methods = {
            'Add' : AddModel,
            'Get' : GetModel,
            'Update' : UpdateModel,
            'Delete' : DeleteModel,
            'Index' : IndexModel
        };
        
        for(var method in Methods) if(Methods.hasOwnProperty(method))
            AddMethod(method, Methods[method]);
    }
    module.exports.GetEverything = function(callback) {
        everything = {};
        var self = this;
        var got = 0;
        var need = 0;
        for (var model in Models) if (Models.hasOwnProperty(model)) {
            need ++;
            (function () {
                var mod = model; // grab a copy for this closure
                var addToEverything = function(err, list) {
                    everything[mod] = list;
                    got ++;
                    if(got == need)
                        callback(everything);
                };
                GetAllModels(Models[mod])(addToEverything);
            })()}
    };
};