var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mountainschema = new Schema({
    _id: {
      type: String,
      maxlength: 30,
      unique: 1
    },
    u_password: {
      //비밀번호 암호화 bycrpt
      type: String,
      maxlength: 20,
      unique: 1
    },
    u_email: {
      type: String,
      maxlength: 50,
      unique: 1
    },
    u_phonenum: {
      type: Number,
      maxlength: 9,
      unique: 1
    },
    u_image: {
      data: Buffer,
      contentType: String
    },
    u_description: {
      type: String
    },
    u_keyword: {
      type: [String],
      default: undefined
    },
    u_blist: {
      type: [String],
      default: undefined
    },
    u_bnum: {
      type: [Number],
      default: 0
    }
});

module.exports = mongoose.model('mountain', mountainschema);
