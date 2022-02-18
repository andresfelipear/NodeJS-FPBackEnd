const { Router } = require('express')
const router = Router()

const adminController = require('../controllers/admin.controller')
const {verifyUser} = require('../auth/authenticate')

//Post createPost

router.post('/add-post',verifyUser,adminController.postAddPost )

//Post deletePost

router.post('/deletePost', verifyUser, adminController.postDeletePost)

module.exports = router
    