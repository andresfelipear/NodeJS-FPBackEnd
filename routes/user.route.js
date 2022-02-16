const { Router } = require('express')
const router = Router()

const userController = require('../controllers/user.controller')

//Post Sign Up

router.post('/signup', userController.postSignUp)

module.exports = router
