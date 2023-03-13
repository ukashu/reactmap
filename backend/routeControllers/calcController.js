const asyncHandler = require('express-async-handler')
//POST /api/calc
//calculate variables

//ground speed zmienia się o 20 węzłów przy zmianie stopnia o jeden w prawo, czy to się zgadza? TODO
//if inputs are 0 response is null TODO
const getCalc = asyncHandler(async(req, res) => {
  //it doesn't support zero values!! TODO
  if (req.body.coordinates.length === 0 || req.body.coordinates === undefined || req.body.geoCoordinates === undefined|| req.body.distance === undefined || req.body.md === undefined || !req.body.tas || req.body.ws === undefined || req.body.wta === undefined) {
    res.status(400)
    throw new Error('Please provide all outside variables')
  }

  let coordinates = req.body.coordinates

  let resultsObj = []

  //return calc for all sections
  for (let i = 0; i < coordinates.length - 1; i++) {
    resultsObj.push(calc(coordinates[i], coordinates[i+1], Number(req.body.distance[i]), Number(req.body.md), Number(req.body.tas), Number(req.body.ws), Number(req.body.wta)))
  }

  res.json(resultsObj)
})

//calc angle
function calcAngle(pt1, pt2) {
  let x = pt2[0].toFixed(6) - pt1[0].toFixed(6)
  let y = pt2[1].toFixed(6) - pt1[1].toFixed(6)

  let angle = calcAngleDegrees(x, y)

  return angle
}

function calcAngleDegrees(x, y) {
  let angle = Math.atan2(y, x) * 180 / Math.PI;
  if (x === 0 && y === 0) {
    //there is no line
    return 0
  }
  angle = angle.toFixed(2)
  if (x < 0 && y >= 0 ) {
    console.log('Q4')
    angle = (90- angle) + 360
  } else {
    angle = 90 - angle
  }
  return angle
}

//main route calculations
function calc(cord1, cord2, S, MD, TAS, WS, WTA) {
  //calculate TT
  let TT = calcAngle(cord1, cord2)
  TT = Math.round(TT)

  //change TT from 0 to 360
  if (TT === 0) {
    TT = 360
  }

  let MT = TT - MD

  //calculate drift angle
  let DA = (Math.sin(((WTA + 180 - MD) - MT) * Math.PI / 180)) * ((60 * WS) / TAS) //dzielenie przez zero! TODO

  //calculate magnetic heading
  let MH = MT - DA
  //te if elsy wystarczą?
  if (MH <= 0) {
    MH = 360 + MH
  } else if (MH > 360) {
    MH = MH - 360
  }

  //calculate ground speed
  //true track 360 makes a difference here !!!
  let GS =  TAS+(WS*(Math.cos(((WTA + 180)-(TT+(((MH + MD)-TT)/2))) * Math.PI / 180)))

  //calculate time
  let T = (60*metersToNautical(S))/GS

  //round only on output
  return {TT: TT.toString(), DA, MH, GS, T}
}

function metersToNautical(meters) {
  let miles = meters.toFixed(2) / 1852
  return miles
}

module.exports = {
  getCalc
}