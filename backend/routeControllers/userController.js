const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//POST /api/login
//login with google
const login = asyncHandler(async(req, res) => {

  //google verifies the token
  const ticket = await client.verifyIdToken({
    idToken: req.body.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const user = {
    id: payload['sub'],
    email: payload['email'],
    name: payload['name'],
    picture: payload['picture']
  }
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  //create or validate the user
  if(user.id) {
    console.log('user is authenticated by google')

    //upsert the user TODO
    try {
      await prisma.users.upsert({
        where: {
          email: user.email,
        },
        update: {},
        create: {
          gid: user.id,
          email: user.email,
          name: user.name
        },
      })
    } catch(err) {
      res.status(400)
      throw new Error('Google sign in unsuccessful')
    }
    
    

    //send the response to save in localstorage
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user.id)
    })
  } else {
    res.status(400)
    throw new Error('Google sign in unsuccessful')
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
  })
}

module.exports = {
  login
}