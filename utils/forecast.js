const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fe3fde04781b1fbf97c3c33d80fa6b4e&query=' + latitude + ',' + longitude;
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Error: Unable to connect to the weather service!',undefined)
        } else if(response.body.error) {
            callback('Error: Unable to find location!')
        } else {
            callback(undefined,'Weather is ' + response.body.current.weather_descriptions + '. It is currently ' + response.body.current.temperature + ' degrees out . It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast