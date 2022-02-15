const mongoose = require('mongoose');
 const userSchema = mongoose.Schema({
     fullname:String,
     id_number:Number

 })
 const user = mongoose.model('user',userSchema);
 module.exports = user