var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mountainschema = new Schema({
    _id: {
      type: Number,
    },
    mntnnm: {
      type: String,
    },
    hndfmsmtnslctnrson: {
      type: String
    },
    mntninfopoflc: {
      type: String
    },
    mntninfohght: {
      type: String
    },
    mntninfomngmemnbdnm: {
      type: String
    },
    mntninfomangrtlno: {
      type: String
    },
    mntninfodscrt: {
      type: String
    },
    mntninfodtlinfocont: {
      type: String
    },
    crcmrsghtnginfodscrt: {
      type: String
    },
    crcmrsghtnginfoetcdscrt: {
      type: String
    },
    hkngpntdscrt: {
      type: String,
    },
    mntnsbttlinfo: {
      type: String,
    },
    ptmntrcmmncoursdscrt: {
      type: String,
    },
});

module.exports = mongoose.model('Mountain', mountainschema);
