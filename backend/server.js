const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const { getCalc } = require('./routeControllers/calcController')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/api/calc', getCalc)

app.listen(PORT, () => { console.log( `Listening on port ${PORT}` )})