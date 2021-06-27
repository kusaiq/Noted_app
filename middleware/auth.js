const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const errorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
	//const token = req.header('x-auth-token');
	let token;
	//now we wanna check the headers
	//we gonna check the authorization header
	if (req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
		//now we only want the token part
	}
	//else if(req.cookies.token){
		//token =req.cookies.token
	//}
	//else if(req.cookies.token){
	//	token =req.cookies.token
	//}
	//check if token exists
	if (!token) {
		return next(new errorResponse(`not authorize to access this route `, 401));
	}
	// if token exsits than vertify it 
	try {
		//verify token 
		//now we gonna extract the payload
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		//the decoded had the id value
		req.user = await User.findById(decoded.id);//so what ever id is in that token
		//witch the user got from loggin in
		//so this will always be the logged in user 
		next();
	} catch (err) {
		return next(new errorResponse(`not authorize to access this route `, 401));
	}

});
