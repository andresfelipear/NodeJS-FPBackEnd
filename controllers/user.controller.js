const jwt = require('jsonwebtoken')


const { COOKIE_OPTIONS, getToken, getRefreshToken } = require('../auth/authenticate')
const Posts = require('../models/posts.model')
const Comments = require('../models/comments.model')

const getById = (postId) => {
  return Posts.findById(postId, (err, post) => {
    if (err) console.log(err)
    return post
  }).clone()
}

exports.postSignUp = async (req, res, next) => {
  const { User } = req.context.models;
  try {
    User.register(new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          // console.log(err)
          res.status(500).send(err)
        } else {
          user.email = req.body.email
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save((err, user) => {
            if (err) {
              console.log(err)
              res.status(500).send(err)
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({ sucess: true, token })
            }
          })
        }
      }
    )
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}

exports.postLogin = (req, res, next) => {
  const { User } = req.context.models;
  try {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })

    const { username, password } = req.body
    User.findOne({ username: username }, (err, user) => {
      if (user) {
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.send({ success: true, token })
          }
        })
      }
      else {
        res.status(400).json({ err });
      }
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}

exports.getData = (req, res, next) => {
  try {
    res.send(req.user)

  } catch (error) {
    console.log(err)
    res.status(401).json({ error })
  }

}

exports.getLogout = (req, res, next) => {
  try {

    const { User } = req.context.models
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies;

    User.findById(req.user._id)
      .then((user) => {
        console.log("find user")
        const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken == refreshToken)
        if (tokenIndex !== -1) {
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
        }
        user.save((err, user) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.clearCookie('refreshToken', COOKIE_OPTIONS)
            res.send({ success: true })
          }

        })
      })
  }
  catch (error) {
    console.log(error);
    res.status(401).json({ error })
  }

}

exports.postRefreshToken = (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  const { User } = req.context.models;
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({ _id: userId }).then(user => {
        if (user) {
          const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken == refreshToken)

          if (tokenIndex === -1) {
            res.status(401).send("Unauthorized")
          } else {
            const token = getToken({ _id: userId })
            const newRefreshToken = getRefreshToken({ _id: userId })
            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
            user.save((err, user) => {
              if (err) {
                res.status(500).send(err)
              } else {
                res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                res.send({ success: true, token })
              }
            })
          }
        }
      })
    } catch (err) {
      console.log(err)
      res.status(401).send("Unauthorized")
    }
  } else {
    (err) => {
      console.log(err)
    }
    res.status(401).send("Unauthorized")
  }
}

//get Posts
exports.getPosts = (req, res, next) => {
  try {
    Posts.find((err, posts) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.send({ success: true, posts })
      }
    })

  } catch (error) {
    console.log(error);
    res.status(401).json({ error })
  }

}

//get Comments
exports.getComments = (req, res, next) => {
  try {
    const {postId} = req.params
    Comments.find({postId:postId},(err, comments) => {
      if (comments) {
        res.send({ success: true, comments })     
      } else {
        console.log("not found")
        console.log(err)
        res.status(404).json({ err });
      }
    })

  } catch (error) {
    console.log(error);
    res.status(401).json({ error })
  }

}