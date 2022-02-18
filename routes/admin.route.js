const { Router } = require('express')
const router = Router()

const userController = require('../controllers/user.controller')
const {verifyUser} = require('../auth/authenticate')

//Post createPost

router.post('/add-post',verifyUser,adminController.postAddPost )

module.exports = router
    