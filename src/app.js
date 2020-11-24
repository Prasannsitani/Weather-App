const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../utils/geoCode')
const foreCast = require('../utils/forecast') 

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars Engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to serve
app.use(express.static(publicPath))

app.get('/', (req, res) => { 
    res.render('index', {
        title: 'Weather App!!',
        name: 'Prasann Sitani'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!!',
        name: 'Prasann Sitani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!!',
        name: 'Prasann Sitani',
        helpMsg: 'This page is here to help you out when you stuck in our Application!!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            Error: 'Address must be provided!!'
        })
    }
    geoCode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
            return res.send({err})
        }  
        foreCast(latitude, longitude, (err, foreCastData) => {
            if(err) {
                return res.send({err})
            }
            res.send({
                location,
                foreCast: foreCastData,
                address: req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            Error: 'You must provide a search term!!'
        })
    }
    console.log(req.query)
    res.send({
        products: []    
    })
})

app.get('/help/*', (req, res) => {
    res.render('handlebars', {
        title: '404',
        name: 'Prasann Sitani',
        errorMsg: 'Help Article'
    })
})

app.get('*', (req, res) => {
    res.render('handlebars', {
        title: '404',
        name: 'Prasann Sitani',
        errorMsg: 'Page'
    })
})

app.listen(port, () => {
    console.log('Server is started at port ' + port)
})