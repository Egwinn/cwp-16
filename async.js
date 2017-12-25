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

    // task01-3
    let street = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Via Nicola Salvi`);
    console.log('------- task01-3 -------')
    console.log(street.data.results[0].formatted_address);
    street.data.results[0].address_components.forEach((component) => {
        console.log(`   -${component.long_name}`);
    });
}
