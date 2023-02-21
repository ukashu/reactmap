const express = require('express')
const app = express()
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const { protect } = require('./middleware/authMiddleware')
const { login } = require('./routeControllers/userController.js')
const { getCalc } = require('./routeControllers/calcController.js')
const { getPlans, savePlan } = require('./routeControllers/plansController.js')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.route('/api/login').post(login)
app.route('/api/me').get(protect, getPlans).post(protect, savePlan)
app.route('/api/calc').post(getCalc)

app.use(errorHandler)

app.listen(PORT, () => { console.log( `Listening on port ${PORT}` )})