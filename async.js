const axios = require('axios');
const Promise = require('bluebird');
WorkWork();

async function WorkWork() {
    // task01-1
    let cities = await Promise.all([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Madrid`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Rome`)
    ]);
    console.log('------- task01-1 -------');
    cities.forEach((city) => {
        console.log(city.data.results[0].formatted_address);
    });

    // task01-2
    let country = await Promise.any([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Paris`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Nice`)
    ]);
    console.log('------- task01-2 -------')
    console.log(country.data.results[0].formatted_address.split(", ")[1]);
}
