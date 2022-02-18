const Posts = require('../models/posts.model')


const getById = (postId) => {
    return Posts.findById(postId, (err, post) => {
        if (err) console.log(err)
        return post
    }).clone()
}


//Add Post (post)
exports.postAddPost = (req, res, next) => {
    try {
        const { title, imageUrl, description } = req.body
        const post = new Posts({
            title: title,
            imageUrl: imageUrl,
            description: description,
            date: new Date(),
            userId: req.user._id,
            username: req.user.username
        })
        post.save((err, post) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send({ sucess: true})
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }

}

//Edit Post (post)
exports.postEditPost = async (req, res, next) => {
    const { title, imageUrl, description, postId } = req.body
    const post = await getById(postId)

    post.title = title
    post.imageUrl = imageUrl
    post.description = description
    post.date = new Date()

    await post.save()
    res.redirect('/')
}

//Delete Post (post)
exports.postDeletePost = async (req, res, next) => {
    const { postId } = req.body
    await Posts.findByIdAndDelete(postId)
    res.redirect('/')
}

// //Like Post
// exports.postLikePost = async(req, res, next)=>{
//     const { postId} = req.body
//     const post = await getById(postId)

//     post.likes = post.likes+1
//     await post.save()

//     res.redirect('/')

// }

// //Add comment Post
// exports.postAddComentPost = async(req, res, next)=>{
//     const {postId, comment} = req.body
//     const post = await getById(postId)
//     post.comments.push({
//         comment:comment,
//         date: new Date()
//     })
//     await post.save()
//     res.redirect('/')
// }