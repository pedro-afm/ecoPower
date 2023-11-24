const mongoose = require('mongoose');

// Creating the user information data schema to search in MongoDB
const usersInformationSchema = new mongoose.Schema({
  name: {
    type: String, required: true 
  },
  document: {
    type: String, required: true 
  },
  name: {
    type: String, required: true 
  },
  contact: {
    type: String, required: true 
  },
  email: {
    type: String, required: true 
  },
  birthday: {
    type: Date, required: true 
  },
  car: {
    type: String, required: true 
  },
  chargers: [
    { date: {type: Date, require: true}},
    { coord: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    },
    { energy: {type: Number, require: true}},
    { price: {type: Number, require: true}},
    { place: {type: String, require: true}}
  ],
});

const UsersInformation = mongoose.model('UsersInformation', usersInformationSchema, 'users' );

module.exports = { UsersInformation };