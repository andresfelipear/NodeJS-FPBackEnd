const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const passport = require('passport')

const { COOKIE_OPTIONS, getToken, getRefreshToken, verifyUser } = require('../auth/authenticate')


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
    console.log("hola")
    console.log(req.body);

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

exports.getLogout = (req, res, next) => {
  try {
    res.send({ success: true })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}