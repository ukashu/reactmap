const jwt = require('jsonwebtoken')

//generate jwt token for user return it

const generateToken = (id) => {
  //TODO catch errors here
  return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
  })
}

module.exports = {
  generateToken
}