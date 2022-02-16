const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.postSignUp = async (req, res, next) => {
  const { User } = req.context.models;
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

exports.postLogin = (req, res, next) => {
  const { User } = req.context.models;
  try {
    console.log(req.body)

    const { username, password } = req.body
    User.findOne({ username: username }, (err, user) => {
      bcrypt.compare(password, user.password).then((isMatching) => {
        if (isMatching) {
          res.json(user);
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