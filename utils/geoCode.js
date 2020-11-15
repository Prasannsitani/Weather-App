const request = require('postman-request')

// Geocoding 
//  Address -> Lat/Long -> Weather Details

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhc2Fubi1zaXRhbmkiLCJhIjoiY2toY2RhNmNmMGdpZDJ5b2dxbnYycXVkNCJ9.YhDxfpUT-mR9vOcLP1GlGw&limit=1'
    request({url: url, json: true}, (error, response) => {
        if(error) { 
            callback('Error: Unable to connect to location services!', undefined);
        } else if(response.body.message === 'Not Found') {
            callback('Error: Unable to find location!, Try another search.',undefined);
        } else if( response.body.features.length === 0) {
            callback('Error: Unable to find location!, Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })    
}

module.exports = geoCode