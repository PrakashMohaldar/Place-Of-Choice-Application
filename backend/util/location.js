const axios = require('axios');
const HttpError = require('../models/http-error')
// const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';
const API_KEY = 'pk.05eea0033a2ec7839ab5c19e33ba8d61';

async function getCoordsForAddress(address){

    /*sending request to other api using axios*/
    // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
    const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${encodeURIComponent(address)}&format=json`)

    const data = response.data;

    if(!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('Could not find location for the specified address.',422)
        throw error;
    }
    const location = {
        lat:data[0].lat,
        lng:data[0].lon
    }
    console.log(location);
    // const coordinates = data.results[0].geometry.location;
    const coordinates = location;

    return coordinates;
}
module.exports = getCoordsForAddress;