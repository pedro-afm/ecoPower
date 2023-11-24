const mongoose = require('mongoose');

// Creating the charging station data schema to search in mongoDB
const chargingStationsSchema = new mongoose.Schema({
  coord: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  address: {
    type: String,
    required: true,
  },
  connectors: [
    { connector: {type: String, require: true}},
    { quantity: {type: Number, require: true}},
    { power: {type: String, require: true}}
  ],
});

const ChargingStations = mongoose.model('ChargingStations', chargingStationsSchema, 'chargingStations' );

module.exports = { ChargingStations };