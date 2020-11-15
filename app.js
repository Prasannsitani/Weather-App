const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

geoCode('Sidhi Madhya Pradesh',(error, data) => {
    forecast(data.latitude, data.longitude, (error, data) => {
        console.log(data);
    })
})