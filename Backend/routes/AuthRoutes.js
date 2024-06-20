const router = require('express').Router()
const { createUser, signin, verifyemail, forgotPassword, resetPassword } = require('../controllers/AuthController')

const { validateUser, validate,validatePass } = require('../middleware/validator')


router.post('/create', validateUser, validate ,createUser)
router.post('/signin', signin)
router.post('/verify-email', verifyemail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password'  ,validatePass,validate, resetPassword)

module.exports = router