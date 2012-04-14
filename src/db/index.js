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
        name: String,
        faction: ref('Faction'),
	    inventory: [ref('Item')],
	    stats: {
		    Health: Number,
            Manliness: Number,
            Womanliness: Number
	    }
    });
    
    var FactionSchema = new Schema({
        name: String,
    });

    var ItemSchema = new Schema({
	    name: String,
	    type: {type: String, enum: [
            "armor",
            "weapon",
            "ammo",
            "onetime",
            "quest"
        ]},
	    buffs: [{
		    stat: String,
		    buff: Number
        }]
    });

    var Player = mongoose.model('Player', PlayerSchema);
    var Item = mongoose.model('Item', ItemSchema);
    var Faction = mongoose.model('Faction', FactionSchema);

    var AddModel = function(model) {
        return function(obj, callback) {
            modeledObject = new model(obj);
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
            model.updateById(id, obj, options, callback);
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

    // now add all the methods.
    var Models = {
        'player' : Player,
        'faction' : Faction,
        'item' : Item
    };

    for(model in Models) if(Models.hasOwnProperty(model)) {
        var AddMethod = function(prefix, func) {
            module.exports[prefix + model] = func(Models[model]);
        };
        var Methods = {
            'Add' : AddModel,
            'Get' : GetModel,
            'Update' : UpdateModel,
            'Delete' : DeleteModel,
            'Index' : IndexModel
        };
        
        for(method in Methods) if(Methods.hasOwnProperty(method))
            AddMethod(method, Methods[method]);
    }
};