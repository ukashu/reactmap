const express = require('express')
const app = express()
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const { protect } = require('./middleware/authMiddleware')
const { validate } = require('./middleware/validationMiddleware')
const { login } = require('./routeControllers/userController.js')
const { getCalc } = require('./routeControllers/calcController.js')
const { getPlans, savePlan } = require('./routeControllers/plansController.js')
const { getDeclination, getWind } = require('./routeControllers/outsideCallsController.js')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(validate)

app.route('/api/login').post(login)
app.route('/api/plans').get(protect, getPlans).post(protect, savePlan)
app.route('/api/calc').post(getCalc)
app.route('/api/declination').post(getDeclination)
app.route('/api/wind').post(getWind)

app.use(errorHandler)

app.listen(PORT, () => { console.log( `Listening on port ${PORT}` )})