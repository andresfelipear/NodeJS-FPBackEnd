const { Router } = require('express')
const router = Router()
const passport = require('passport')

const userController = require('../controllers/user.controller')
const {verifyUser} = require('../auth/authenticate')

//Post Sign Up

router.post('/signup', userController.postSignUp)

//Post Login
router.post('/login',  passport.authenticate("local"),userController.postLogin)

//Get logout
router.get('/logout',verifyUser, userController.getLogout)

//get data
router.get('/me',verifyUser, userController.getData)


//refresh Token
router.post('/refreshToken', userController.postRefreshToken)
module.exports = router
    