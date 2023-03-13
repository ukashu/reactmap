const { windClient } = require('./config/axiosClients.js')

const windAPI = {
  get: async function (lat, lng) {
    try {
      const windResponse = await windClient.request({
        method: "GET",
        params: {
          latitude: lat,
          longitude: lng,
          hourly: 'windspeed_180m,winddirection_180m',
          windspeed_unit: 'kn',
          forecast_days: '2',
          timezone: 'Europe/Berlin'
        }
      })

      const hour = new Date(Date.now()).getHours()
  
      return {ws: Number(windResponse.data.hourly.windspeed_180m[hour].toFixed(0)), wta: windResponse.data.hourly.winddirection_180m[hour]}

    } catch(err) {
      throw new Error(err)
    }
  }
}

module.exports = { windAPI }