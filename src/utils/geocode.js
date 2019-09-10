const request = require('request')

const mapBoxToken = 'pk.eyJ1IjoiZGV2b25sYW1iZXJ0IiwiYSI6ImNqenk3bHR4bzFraG0zbG1qdTRxNWRnaXEifQ.zs_80FtSYvN7ix89xg-b3w'

const geocode = (location, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapBoxToken}&autocomplete=true`

    request({ url, json: true }, (e, { body } = {}) => {
        if (e) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to geocode location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode