const express = require('express')
const router = express.Router()
const passport = require('../../controllers/api/autoControllerApi')

const authController = require('../../controllers/api/autoControllerApi')

router.post('/authenticate', authController.authenticate);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/facebbok_token', passport.authenticate('facebook-token'), authController.authFacebbokToken);


module.exports = router