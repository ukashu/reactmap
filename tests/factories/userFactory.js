const crypto = require("crypto");

//generate random user data and return it

function generateUserData() {
  //generate random google id string 50 char 
  const id = crypto.randomBytes(25).toString('hex');

  //generate random name up to 25 char 
  const name = crypto.randomBytes(5).toString('hex');

  //generate random email up to 50 char 
  const email = crypto.randomBytes(10).toString('hex');

  //return user object
  return { id, name, email }
}

module.exports = {
  generateUserData
}