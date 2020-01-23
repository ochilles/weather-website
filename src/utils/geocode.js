const request = require("request")

// Geocoding - mapbox.com - ochilles, chr.kikian@gmail.com, raziel01
// Address -> Lat/Long -> Weather

// const urlGeocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoib2NoaWxsZXMiLCJhIjoiY2s1Z2oxODExMDhlZjNmbzA0OG5kYmc0MSJ9.TcZ2bNM6BwIkEvt33KqXgA&limit=1'

// request({url: urlGeocoding, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location service')
//     } else if (response.body.features.length === 0) {
//         // server returns features = [] when they can't find location
//         console.log('Unable to find location, please try again')
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
//     }
// })

// Use callback function for geoCode
const geoCode = (address, callback) => {
    const urlGeoCode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib2NoaWxsZXMiLCJhIjoiY2s1Z2oxODExMDhlZjNmbzA0OG5kYmc0MSJ9.TcZ2bNM6BwIkEvt33KqXgA&limit=1'
    // able to use shorthand syntax for an object, url:url -> url
    // able to use object destructuring for response
    // request({url: urlWeather, json: true}, (error, {body}) => {
    request({url: urlGeoCode, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location, please try again', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode