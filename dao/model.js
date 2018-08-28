const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/h51804');

//用户模型
const User = mongoose.model("user",{
	username:String,
	password:String,
	email:String
});


module.exports = {User};
