const { Router } = require('express')
const router = Router()

const userController = require('../controllers/user.controller')

//Post Sign Up

router.post('/signup', userController.postSignUp)

//Post Login
router.post('/login', userController.postLogin)

//Get logout
router.get('/logout', userController.getLogout)

module.exports = router
    