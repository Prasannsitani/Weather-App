const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

var userInput = process.argv[2];

if(!userInput) {
    console.log('Please provide an Address!')
} else {
    geoCode(userInput,(error, {latitude, longitude, location}) => {
        if(error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }
            console.log(location);
            console.log(forecastData);
        })
    })
}

