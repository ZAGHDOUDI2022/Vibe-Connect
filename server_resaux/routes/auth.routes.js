const router = require('express').Router()
const authController = require('../controllers/auth.controllers')
const { isAuth } = require("../middleware/AuthMiddleware");

const {
    Validationregister,
    Validation,
    Validationlogin,
  } = require('../middleware/validation');

router.post("/register",Validationregister,Validation,authController.signUp)
router.post("/login",Validationlogin,Validation,authController.signIn)


module.exports = router