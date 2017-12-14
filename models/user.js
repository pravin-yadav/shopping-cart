var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {
      type: String,
      index : true
    },
    username : {
	   	type : String,
	   	index : true
	   },
     email : {
      type: String,
      index : true
     },
   password : {
	   	type : String
	   }
});

userSchema.methods.encryptPassword  = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10), null)
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);





