//ground speed zmienia się o 20 węzłów przy zmianie stopnia o jeden w praco, czy to się zgadza?

const getCalc = (req, res) => {
  let coordinates = req.body.coordinates

  let azimuth = calcAngle(coordinates[0], coordinates[1])
  azimuth = Math.round(azimuth)

  let resultObj = calc(azimuth, Number(req.body.distance), Number(req.body.md), Number(req.body.tas), Number(req.body.ws), Number(req.body.wta))

  console.log(resultObj)

  res.json({ azimuth: azimuth.toString() })
}

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

//other route calculations
function calc(TT, S, MD, TAS, WS, WTA) {
  //change TT from 0 to 360
  if (TT === 0) {
    TT = 360
  }

  let MT = TT - MD

  //calculate drift angle
  let DA = (Math.sin(((WTA + 180 - MD) - MT) * Math.PI / 180)) * ((60 * WS) / TAS)

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
  return {DA, MH, GS, T}
}

function metersToNautical(distance) {
  let miles = distance.toFixed(2) / 1852
  return miles
}

module.exports = {
  getCalc
}