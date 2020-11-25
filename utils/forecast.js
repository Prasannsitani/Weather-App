const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fe3fde04781b1fbf97c3c33d80fa6b4e&query=' + latitude + ',' + longitude;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Error: Unable to connect to the weather service!',undefined)
        } else if(body.error) {
            callback('Error: Unable to find location!')
        } else {
            callback(undefined,'The Weather is ' + body.current.weather_descriptions + '. It is currently ' + body.current.temperature + '\u00B0C. It feels like ' + body.current.feelslike + '\u00B0C outside. The Humidity is ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast