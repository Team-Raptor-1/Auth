const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//// Login User
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
});


//// Register User
exports.register = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }

  console.log("registered")
});


//// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })


  res.status(200).json({
    success: true,
    message: "Logged Out",
  })
});

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, user, token });
};
