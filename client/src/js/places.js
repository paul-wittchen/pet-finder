const places = require('places.js');

const placesAutocomplete = places({
  appId: 'plSIZRX47RIY',
  apiKey: '5a56b609a534aa8e8bcd2ceb7e4f916c',
  container: document.querySelector('#address-input')
});

module.exports = {
    placesAutocomplete
}