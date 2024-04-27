const router = require('express').Router()
const { createUser, signin, verifyemail, forgotPassword, resetPassword } = require('../controllers/user')
const { isResetTokenValid } = require('../middleware/user')
const { validateUser, validate } = require('../middleware/validator')


router.post('/create', validateUser, validate ,createUser)
router.post('/signin', signin)
router.post('/verify-email', verifyemail)
router.post('/forgot-password', forgotPassword)
router.get('/reset-password', isResetTokenValid , resetPassword)

module.exports = router