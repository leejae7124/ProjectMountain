var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mountainschema = new Schema({
    m_id: {
      type: String,
    }
});

module.exports = {
  mountainSeoul : mongoose.model('mountainSeoul', mountainschema),
  mountainBusan : mongoose.model('mountainBusan', mountainschema),
  mountainDaegu : mongoose.model('mountainDaegu', mountainschema)
}
