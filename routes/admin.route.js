const { Router } = require('express')
const router = Router()

const adminController = require('../controllers/admin.controller')
const {verifyUser} = require('../auth/authenticate')

//Post createPost

router.post('/add-post',verifyUser,adminController.postAddPost )

//Post deletePost

router.post('/deletePost', verifyUser, adminController.postDeletePost)

//Get post

router.get('/getPost/:postId', verifyUser, adminController.getPost)

//Edit post
router.post('/edit-post', verifyUser, adminController.postEditPost)

//like post
router.post('/like-post',verifyUser, adminController.postLikePost)

module.exports = router
    