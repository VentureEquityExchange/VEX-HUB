// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContractSchema = new Schema({
  name : String,
  address : String,
  abi : Array,
  txhash : String,
  account: String
});

ContractSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

module.exports = mongoose.model('Contract', ContractSchema)

