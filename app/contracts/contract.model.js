// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContractSchema = new Schema({
  name : String,
  deployed : Object,
  account: String
});

ContractSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Contract', ContractSchema);

