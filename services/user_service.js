const UserDao = require("../dao/user_dao.js");
const bcrypt = require("bcrypt");//加密

const UserService = {
	login(req,res,next){
		const {username,password} = req.body;
		
		UserDao
			.find({username})
			.then(data=>{
				if(data.length === 1){
					
					const _pass = data[0].password;
					
					if (bcrypt.compareSync(password,_pass)) {
						res.json({res_code:1,res_error:"",res_body:data[0]});
					} else{
						res.json({res_code:0,res_error:"not exist",res_body:{}});
					}
				}else{
					res.json({res_code:0,res_error:"not exist",res_body:{}});
				}
			})
			.catch(err=>{
				res.json({res_code:-1,res_error:err,res_body:{}});
			});
	},
	
	register(req,res,next){
		const {username,passsword,email} = req.body;
		
		const passCrypt = bcrypt.hashSync(passsword,10);
		
		UserDao
			.save({username,password:passCrypt,email})
			.then((data)=>{
				res.json({res_code:1,res_error:"",res_body:data});
			})
			.catch((err)=>{
				res.json({res_code:-1,res_error:err,res_body:{}});
			});
	}
};

module.exports = UserService;