const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token TODO
      const foundUser = await prisma.users.findUnique({
        where: {
          gid: decoded.id,
        },
      })

      req.user = {
        id: foundUser.id,
        name: foundUser.name
      }

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error(error)
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized - no token')
  }
})

module.exports = {
  protect
}