const Posts = require('../models/posts.model')


const getById = (postId) => {
    return Posts.findById(postId, (err, post) => {
        if (err) console.log(err)
        return post
    }).clone()
}

//Edit Post (get)
exports.getPost = async (req, res, next) => {
    try {
        const { postId } = req.params
        const post = await getById(postId).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
        res.send({ sucess: true, post })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }



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
                res.send({ sucess: true })
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }

}

//Edit Post (post)
exports.postEditPost = async (req, res, next) => {
    try {
        const { title, imageUrl, description, postId } = req.body
        const post = await getById(postId)

        post.title = title
        post.imageUrl = imageUrl
        post.description = description
        post.date = new Date()

        await post.save()
        res.send({ success: true })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }


}

//Delete Post (post)
exports.postDeletePost = async (req, res, next) => {
    try {
        const { postId } = req.body

        await Posts.findByIdAndDelete(postId).catch(err => {
            console.log(error)
            res.status(400).json({ error });
        })
        res.send({ sucess: true })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }

}

//Like Post
exports.postLikePost = async (req, res, next) => {
    try {
        const { postId } = req.body
        const post = await getById(postId)

        post.likes = post.likes + 1
        await post.save()
        res.send({success:true})

    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }

}

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