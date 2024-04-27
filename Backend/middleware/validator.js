const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is Missing")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be 3 to 20 characters long!"),

  check("email").normalizeEmail().isEmail().withMessage("Invalid Email!!"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long!"),
    
   check("phoneNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone Number is Missing")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone Number must be 10 characters long!")
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    success: false,
    errors: extractedErrors
  });
};
