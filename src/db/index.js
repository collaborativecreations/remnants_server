/*
 *
 * Public Persistence layer API
 *
 */

var mongoose = require('mongoose');

module.exports = function()
{
    mongoose.connect('mongodb://localhost/remnants_tag');
    mongoose.connection.on('open', function() {
        console.log('OPENED DATABASE!!!');
    });
};