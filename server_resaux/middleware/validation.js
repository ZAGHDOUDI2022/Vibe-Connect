const { body, validationResult } = require("express-validator");
exports.Validationregister = [
  body("username", "please add a valid email").isEmail(),
  body("password", "your password at least 6 caractes").isLength({ min: 6 }),
];
exports.Validationlogin = [
  body("username", "please add a valid email").isEmail(),
  body("password", "bad credential").isLength({ min: 6 }),
];
exports.ValidationArticles=[
  body("post").isEmpty()
]
exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  const success=validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!success.isEmpty()) {
    return res.status(400).json({ success: errors.array() });
  }
  next();
}