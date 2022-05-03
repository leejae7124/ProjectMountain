const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var communitySchema = new Schema({
    nickname: {
        type: String
    },
    mountname: {
        type: String
    },
    imagepath: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    comment: {
        type: Array
    },
    time: {
        type: String
    },
    _id: {
        type: String
    }
})

module.exports = {
    bordF : mongoose.model('bordF', communitySchema),
    bordQ : mongoose.model('brdQ', communitySchema),
    bordC : mongoose.model('bordC', communitySchema),
    bordR : mongoose.model('bordR', communitySchema)
}