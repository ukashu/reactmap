const { declinationClient } = require('./config/axiosClients.js')

const declinationAPI = {
  get: async function (lat, lng) {
    //get cookie and sec
    try {const cookieRes = await declinationClient.request({
      method: "GET"
    })
    let cookie = cookieRes.headers['set-cookie'][0].split(';')
    cookie = cookie[0]

    //get sec variable
    let resArr = cookieRes.data.split('\n')
    let script = resArr.find(item => item.includes('var sec = \''))
    let sec = script.split(';')
    sec = sec[0].split('\'')
    sec = sec[1]

    console.log({cookie, sec})

    //make declination request
    const declinationResponse = await declinationClient.request({
      url: "/srvact/",
      method: "GET",
      headers: {
        "Cookie": cookie
      },
      params: {
        lat: lat,
        lng: lng,
        sec,
        act: "1"
      }
    })

    let decl = declinationResponse.data
    decl = decl.split('&deg')
    decl = decl[0].split(' ')
    decl = decl[decl.length-1]

    return Number(decl)
  
    } catch(err) {
      throw new Error(err)
    }
  }
}

module.exports = { declinationAPI }