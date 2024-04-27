const User = require("../models/user");
const VerificationToken = require("../models/verificationToken");
const ResetToken = require("../models/resetToken");
const { sendError, createRandomBytes } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const { generateOtp, mailTransport, generatePasswordResetLink } = require("../utils/mail");
const { isValidObjectId } = require("mongoose");



exports.createUser = async (req, res) => {
  console.log(req.body)
  const { name, email, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendError(res, "This email already exists!");
    }

    const newUser = new User({
      name,
      email,
      password,
      phoneNumber
    });

    const otp = generateOtp()
    const verificationToken = new VerificationToken({
      owner: newUser._id,
      token: otp
    })

    mailTransport().sendMail({
      from: 'naturemarksystems@gmail.com',
      to: newUser.email,
      subject: "Verify your email account",
      html: `<h1>${otp}</h1>`
    })

    await verificationToken.save();
    await newUser.save();
    res.status(201).json({ success: true, message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim())
    return sendError(res, "Email/Password is missing");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found!");
  if (!user.verified) return sendError(res, "Please verify your email first!");

  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "Incorrect Password!");

  

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      role:user.role,
      token: token
    },
  });
};

exports.verifyemail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp.trim()) {
    return sendError(res, "Invalid request, missing parameters!!");
  }

  if (! (userId)) {
    return sendError(res, "Invalid user id!");
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, "User not found");
    }

    if (user.verified) {
      return sendError(res, "This email is already verified");
    }

    const token = await VerificationToken.findOne({ owner: user._id });
    if (!token) {
      return sendError(res, "Verification token not found");
    }

    const isMatched = await token.compareToken(otp);
    if (!isMatched) {
      return sendError(res, "Please provide a valid OTP");
    }

    user.verified = true;
    await user.save();

    await VerificationToken.findByIdAndDelete(token._id);

    mailTransport().sendMail({
      from: 'naturemarksystems@email.com',
      to: user.email,
      subject: "Welcome!",
      html: `<h1>Email verified successfully</h1>`
    });

    res.json({
      success: true,
      message: "Your email is verified.",
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      }
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email)
  if (!email) return sendError(res, "Please provide a valid email!");

  const user = await User.findOne({ email });
  console.log(user)
  if (!user) return sendError(res, "User not found");

  
  const otp = generateOtp();
  console.log("1")
  const resetToken = new ResetToken({ owner: user._id, token: otp });
  console.log("2")
  await resetToken.save();
  console.log("3")

  mailTransport().sendMail({
    from: 'naturemarksystems@email.com',
    to: user.email,
    subject: "Password Reset OTP",
    html: `<h1>Your Password Reset OTP is: ${otp}</h1>`
  });
  console.log("4")

  res.json({
    success: true,
    id: user._id,
    message: "Password reset OTP is sent to your email."
    
  });
}

exports.resetPassword = async (req, res) => {
  const { otp, newPassword,id } = req.body;
  const user = await User.findById(id);
  if (!user) 
  return res.json({
    success: false,
    message: "Password reset unsuccessfully"
  });

  const token = await ResetToken.findOne({ owner: user._id });
  if (!token) 
  return res.json({
    success: false,
    message: "Password reset unsuccessfully"
  });

  const isMatched = await token.compareToken(otp);
  if (!isMatched) 
  return res.json({
    success: false,
    message: "Password reset unsuccessfully"
  });

  if (newPassword.trim().length < 8 || newPassword.trim().length > 20)
  return res.json({
    success: false,
    message: "Password reset unsuccessfully"
  });

  user.password = newPassword.trim();
  await user.save();

  await ResetToken.findByIdAndDelete(token._id);

  mailTransport().sendMail({
    from: 'naturemarksystems@email.com',
    to: user.email,
    subject: "Password Reset Successfully",
    html: `<h1>Your password has been reset successfully.</h1>`
  });

  res.json({
    success: true,
    message: "Password reset successfully"
  });
}