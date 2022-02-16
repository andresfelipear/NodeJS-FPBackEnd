require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const createContext = (req, res, next) => {
    req.context = {
      models: {
        User,
      },
    };
    next();
  };

const isLoggedIn = (req,res,next) => {}

module.exports = {
    createContext,
    isLoggedIn
}