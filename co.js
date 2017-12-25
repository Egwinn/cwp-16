const axios = require('axios');
const Promise = require('bluebird');
const geolib = require('geolib');
const co = require('co');

WorkWork();

async function WorkWork() {
    // task02-1
    console.log('------- task02-1 -------');
    await co(function* () {
        return yield Promise.all([
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Brest`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`)
        ]);
    }).then(function (value) {
        console.log(geolib.getDistance(value[0].data.results[0].geometry.location,
            value[1].data.results[0].geometry.location));
    }, function (err) {
        console.error(err.stack);
    });

    // task02-2
    console.log('------- task02-2 -------');
    await co(function* () {
        return yield Promise.mapSeries([
            `https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`,
            `https://maps.googleapis.com/maps/api/geocode/json?address=Copenhagen`,
            `https://maps.googleapis.com/maps/api/geocode/json?address=Oslo`,
            `https://maps.googleapis.com/maps/api/geocode/json?address=Brussel`
        ], async function (item) {
            return await axios.get(item);
        });
    }).then(function (value) {
        let cities = {};
        value.map((city) => {
            cities[city.data.results[0].formatted_address] = city.data.results[0].geometry.location;
        });
        console.log(geolib.findNearest(cities['Minsk, Belarus'], cities, 1));
    }, function (err) {
        console.error(err.stack);
    });
}