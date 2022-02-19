const { Router } = require('express')
const router = Router()
const passport = require('passport')

const userController = require('../controllers/user.controller')
const adminController = require('../controllers/admin.controller')
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

//getPosts
router.get('/getPosts', userController.getPosts)

//get post
router.get('/getPost/:postId', adminController.getPost)

//get comments
router.get('/getComments/:postId', userController.getComments)

module.exports = router
    