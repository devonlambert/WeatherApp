const request = require('request')

const darkSkyToken = 'f99bf60e8de1b80ab54864da4355cafa'

const weatherForecast = (coordinates, callback) => {
    
    const url = coordinates ? `https://api.darksky.net/forecast/${darkSkyToken}/${coordinates.latitude},${coordinates.longitude}` : undefined

    request({ url, json: true }, (e, { body } = {}) => {
        if (e) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
    
            const currentTemp = body.currently.temperature
            const chanceOfRain = body.currently.precipProbability 
            const weatherSummary = body.daily.data[0].summary
    
            callback(undefined, `${weatherSummary}
            Is is currently ${currentTemp} degrees out.
            There is a ${chanceOfRain}% chance of rain.`)
        }
    })
}

module.exports = weatherForecast