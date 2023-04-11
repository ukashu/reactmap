const validate = function(req, res, next) {

  let isAZString = /[^a-z0-9]/gmi

  //validate body

    //validate id_token
    if (req.body.id_token) {
      //tokens have special characters
      //comeup with an idea how to validate TODO
    }

    //validate name (String a-z0-9 [length 25])
    if (req.body.name) {

      if (isAZString.test(req.body.name)) {
        res.status(400)
        throw new Error('Input processing error: you used a forbidden character')
      }

      if (req.body.name.length > 25) {
        res.status(400)
        throw new Error('name too long')
      }
    }

    //validate coordinates (Arr(Arr(Number) [length 2]) [max length 10])
    if (req.body.coordinates) {

      if (req.body.coordinates.length < 1) {
        res.status(400)
        throw new Error('Please provide all outside variables')
      }

      if (req.body.coordinates.length > 10) {
        res.status(400)
        throw new Error('Flight too long')
      }

      for (let i = 0; i < req.body.coordinates.length; i++) {
        if ((req.body.coordinates[i].length !== 2) || ((typeof req.body.coordinates[i][0]) !== 'number') || ((typeof req.body.coordinates[i][1]) !== 'number')) {
          res.status(400)
          throw new Error('Flight coordinates invalid')
        }
      }
    }

    //validate geoCoordinates (Arr(Number) [length 2])
    if (req.body.geoCoordinates) {
      if (req.body.geoCoordinates.length !== 2 || typeof req.body.geoCoordinates[0] !== 'number' || typeof req.body.geoCoordinates[1] !== 'number' ) {
        res.status(400)
        throw new Error('Flight coordinates invalid')
      }
    }

    //validate md (Number [-360 to 360])
    if (req.body.md) {

      if ((typeof req.body.md) !== 'number') {
        res.status(400)
        throw new Error('Input processing error: you used a forbidden character')
      }

      if (req.body.md < -360 || req.body.md > 360) {
        res.status(400)
        throw new Error('magnetic declination out of bounds')
      }
    }

    //validate tas (Number [0 to 2000])
    if (req.body.tas) {

      if ((typeof req.body.tas) !== 'number') {
        res.status(400)
        throw new Error('Input processing error: you used a forbidden character')
      }

      if (req.body.tas < 0 || req.body.tas > 2000) {
        res.status(400)
        throw new Error('true air speed out of bounds')
      }
    }

    //validate ws (Number [0 to 201])
    if (req.body.ws) {

      if ((typeof req.body.ws) !== 'number') {
        res.status(400)
        throw new Error('Input processing error: you used a forbidden character')
      }

      if (req.body.ws < 0 || req.body.ws > 201) {
        res.status(400)
        throw new Error('wind speed out of bounds')
      }
    }

    //validate wta (Number [0 to 360])
    if (req.body.wta) {

      if ((typeof req.body.wta) !== 'number') {
        res.status(400)
        throw new Error('Input processing error: you used a forbidden character')
      }

      if (req.body.wta < 0 || req.body.wta > 360) {
        res.status(400)
        throw new Error('wind true angle out of bounds')
      }
    }

  //validate params (if there are params error)

  next()
}

module.exports = { validate }