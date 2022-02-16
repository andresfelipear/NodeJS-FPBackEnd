const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
// const dotenv = require('dotenv')

const JWTSecret = process.env.JWT_SECRET

exports.postSignUp = async (req, res, next) => {
  const { User } = req.context.models;
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body);
    const token = await JWT.sign({ id: user._id }, JWTSecret)
    res.send(data = {
      user,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}

exports.postLogin = (req, res, next) => {
  const { User } = req.context.models;
  try {

    const { username, password } = req.body
    User.findOne({ username: username }, (err, user) => {
      bcrypt.compare(password, user.password).then((isMatching) => {
        if (isMatching) {
          const token = JWT.sign({ id: user._id }, JWTSecret)
          console.log(token);
          res.send(data = {
            user,
            token
          })
        }
        else {
          res.status(400).json({ err });
        }
      })
    })

  } catch (error) {
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