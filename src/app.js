// Go to web-server-7 folder and install npm: npm init -y 
// npm install express
// nodemon src/app.js -e js,hbs
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '..'))
console.log(path.join(__dirname, '../public'))

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')

// Tell express to use templates folder (custom directory) instead of default views folder (root directory)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Templating - Handlebar: render dynamic document & easily create code that can be reused across pages
// install model 'hbs', handlebars integrated with express, npm install hbs
// Tell express() which templating engine installed (Setup handlebars and let it live in 'view' folder)
app.set('view engine', 'hbs')
// specify a path for views folder location with different name
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// app.use() to customize server
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// get a resource at specific url
// .get() has 2 arguments: route and function what we wanna do when someone visit that specific route
// the function gets called with 2 arguments: 
// 1. an object containing info about the incoming request to the server, req
// 2. response containing methods allowing us to customize what we are gonna send to requester, res 
// Sending and object, array of objects, will stringify it to json
// Sending html from html file

// render one of views using handlebar templating enginer - hbs
// passing a value in for this tile
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Punlop T.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome to Help Page',
        name: 'PT'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'O'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a search term for address'
        })
    } // if return, function ends here. it will not run res.send twice

    console.log(req.query)

    geoCode(req.query.address, (error, locationData) => {
        // return will stop function execution
        if (error) {
            return res.send({
                error: error
            })
        }
        
        console.log('Data: ', locationData)
        
        // call forecast function using data from geoCode
        forecast(locationData.latitude, locationData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: locationData.location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    // must include search term, http://localhost:3000/products?search=value&key=value&...
    if(!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    } // if return, function ends here. it will not run res.send twice

    console.log(req.query)
    res.send({
        products: []
    })
})

// For unable to get page (unmatched)
app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        text: 'Help article not found',
        name: 'O'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        text: 'Page not found',
        name: 'O'
    })
})

// Start the server up
// port 3000 - common development port
// callback function which runs when server is up
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


