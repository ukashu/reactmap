const axios = require('axios')
const { errorHandler } = require("./axiosUtils.js")

const windClient = axios.create({
  baseURL: "",
  headers: ""
})

const declinationClient = axios.create({
  baseURL: "https://www.magnetic-declination.com",
  credentials: "include",
  headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-User": "?1"
  },
  referrer: "https://www.google.com/",
  mode: "cors"
})

// declinationClient.interceptors.response.use(undefined, (error) => {
//   return errorHandler(error)
// })

module.exports = {
  windClient,
  declinationClient
}