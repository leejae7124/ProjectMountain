var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listschema = new Schema({
    name:{
        type: Array
    },
    list:{
        type: Array
    }
});


module.exports = {mountain_list : mongoose.model('mountian_list', listschema)}