const asyncHandler = require('express-async-handler')
const { declinationAPI } = require('../apis/declinationAPI.js')
const { windAPI } = require('../apis/windAPI.js')

//POST /api/declination
//get declination for coordinates
const getDeclination = asyncHandler(async(req, res) => {
  //it doesn't support zero values!! TODO
  if (req.body.geoCoordinates.length === 0 || req.body.geoCoordinates === undefined) {
    res.status(400)
    throw new Error('Please provide all outside variables')
  }

  //MD scraper - one call just for testing
  const decl = await declinationAPI.get(req.body.geoCoordinates[1], req.body.geoCoordinates[0])
  res.json({declination: Number(decl)})
})

//POST /api/wind
//get wind data from API call
const getWind = asyncHandler(async(req, res) => {
  if (req.body.geoCoordinates.length === 0 || req.body.geoCoordinates === undefined) {
    res.status(400)
    throw new Error('Please provide all outside variables')
  }

  const wind = await windAPI.get(req.body.geoCoordinates[1].toFixed(4), req.body.geoCoordinates[0].toFixed(4))

  res.json(wind)
})

module.exports = {
  getDeclination,
  getWind
}