const asyncHandler = require('express-async-handler')
const { PrismaClient }= require('@prisma/client')
const prisma = new PrismaClient()

//GET /api/me
//get plans saved in db
const getPlans = asyncHandler(async(req, res) => {
  try {
    const result = await prisma.flights.findMany({
      where: {
        user_id: Number(req.user.id)
      }
    })
    res.json(result)
  } catch(err) {
    res.status(400)
    throw new Error('Database query failed')
  }
})

//POST /api/me
//save calculated plan in db
const savePlan = asyncHandler(async(req, res) => {
  if (req.body.name === undefined || req.body.coordinates.length === 0 || req.body.coordinates === undefined || req.body.md === undefined || !req.body.tas || req.body.ws === undefined || req.body.wta === undefined) {
    res.status(400)
    throw new Error('Please provide all outside variables')
  }
  if (req.body.name.length > 25) {
    res.status(400)
    throw new Error('Flight name is too long')
  }

  try {
    await prisma.flights.create({
      data: {
        user_id: Number(req.user.id),
        name: req.body.name,
        coordinates: JSON.stringify(req.body.coordinates),
        md: req.body.md,
        wta: req.body.wta,
        ws: req.body.ws,
        tas: req.body.tas
      }
    })
  } catch(err) {
    res.status(400)
    throw new Error('Database query failed')
  }

  res.status(200).json({message: 'flight saved'})
})

module.exports = {
  getPlans,
  savePlan
}