const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { generateUserData } = require('../factories/userFactory')
const { generateToken } = require('../factories/sessionFactory')

async function login(page) {
  //generate user and save in db - userFactory
  const user = generateUserData()
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

  //generate jwt for that user and save in localstorage as session - sessionFactory
  const token = generateToken(user.id)
  const data = JSON.stringify({_id: user.id, name: user.name, email: user.email, token: token,picture: 'https://lh3.googleusercontent.com/a/AGNmyxaAUncMc5zS7dT4TAMv5pAwzgeTWrSsZTUHVKE6=s96-c'})

  await page.evaluateOnNewDocument((data) => {
    localStorage.clear();
    localStorage.setItem('user', data);
  }, data);

  //refresh page
  await page.reload()

  //return a function for deleting this specific user from db
  return async function() {
    const email = user.email
    await prisma.users.delete({
      where: {
        email: email,
      }
    })
  }
}

module.exports = {
  login
}