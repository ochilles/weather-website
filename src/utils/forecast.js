const request = require('request')

// // url to fetch data from darksky.net
// // query string at the end of url: ?key=value&otherKey=otherValue
// const urlWeather = 'https://api.darksky.net/forecast/d5f1fab699628d7ff4aff23750267915/37.8267,-122.4233?units=si'

// // 2 arguments, options object and function to run
// // json: true will parse the received json string to object
// request({url: urlWeather, json: true}, (error, response) => {
//     if (error) {
//         // low-level error, such as no internet connection
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         // server responses error when app cannot fetch data, such as wrong coordinate
//         console.log('Unable to find a location')
//     } else {
//         // console.log(response.body.currently)
//         console.log(response.body.daily.data[0].summary)
//         console.log(`It is currently ${response.body.currently.temperature} degrees Celcius out. There is a ${response.body.currently.precipProbability}% chance of rain.`)
//     }
// })

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// Use callback function for forecast

const forecast = (latitude, longitude, callback) => {
    const urlWeather = 'https://api.darksky.net/forecast/d5f1fab699628d7ff4aff23750267915/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    // able to use shorthand syntax for an object, url:url -> url
    // able to use object destructuring for response
    // request({url: urlWeather, json: true}, (error, {body}) => {
    request({url: urlWeather, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find a location', undefined)
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees Celcius out. The high today is ${response.body.daily.data[0].temperatureHigh} C with a low of ${response.body.daily.data[0].temperatureLow} C. There is a ${response.body.currently.precipProbability}% chance of rain.`)
        }
    }) 
}

module.exports = forecast

