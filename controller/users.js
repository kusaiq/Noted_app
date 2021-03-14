const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const errorResponse = require('../utils/errorResponse');

//dsc
//register a user
// route post /api/v1/auth/register
// access public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;//we are pulling some things out of the req.body
    //create our User
    const user = await User.create({
        name,
        email,
        password//notice we didnt hash the password and the reason for that is 
        //we are gonna create a middleware so when ever a user is created 
        //this middleware will run and hash it
       
    });
    //create token 
    const token =user.getSignedJwtToken();//its imortant that is a lower case because it not a static method
    res.status(200).json({token})
    //i commented the above code cuz we gonna use cookies

});

//dsc
//login a user
// route post /api/v1/auth/login
// access public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;//we are pulling some things out of the req.body
    //first lets check if the password and the email written
    if (!password || !email) {
        return next(new errorResponse(`please add a password ${req.params.id}`, 404));
        //the reason why we done some auth in here and not in the register
        //cuz in the register error handling is hapening the model it self 
        //and here we are checking so we gonna have to write the error handling our selfs 
    }
    //now we gonna check if the user is in the base (in the next line of code we are finding)
    const user = await User.findOne({ email }).select('+password');//the meaning behind the .select
    //is in our model we write that the password select is false so we cant access it 
    if (!user) {
        return next(new errorResponse(`ivalid crotential ${req.params.id}`, 401));//401 means its unautherized
    }
    //FOR THE PASSWORD WE GONNA HAVE TO TAKE THE PLANE TEXT PASSWORD AND compare it
    //to the encrypted password
    //so we gonna need a fuction to decrypt the password and compare it 
    const ismatched = await user.matchPasswors(password);//the reason we are using await is becuz we are using 
    //bcrypt witch is in fact is a promise
    if (!ismatched) {
        return next(new errorResponse(`ivalid crotential ${req.params.id}`, 401));
    }

    const token =user.getSignedJwtToken();//its imortant that is a lower case because it not a static method
   res.status(200).json({success:true,token})
    
});

//dsc
//user info
// route get /api/v1/auth/register
// access private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);//since we are using the protect middleware we always 
    //have acess to req.user witch will always be the logged in user
    res
        .status(200)
        .json({
            success: true,
            data: user
        });
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {//set token to none and we gonna set it to expire in like 10 sec
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
});
