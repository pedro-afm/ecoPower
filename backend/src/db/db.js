const mongoose = require('mongoose');
require('dotenv').config();
const chargingStationModule = require('./chargingStations');
const usersInformationModule = require('./user')
const password = process.env.DB_PASSWORD;

// Oppening the connection with mongoDB, using mongoose and the key
const openDbConnection = async function() {
    try {
        const db = await mongoose.connect(`mongodb+srv://maldonado:${password}@cluster0.g2sbzjq.mongodb.net/ecoPowerDB`);
        console.log(`Connected to database: ${db.connection.host}`);
    } catch (e) {
        console.error('Failed to connect to database:', e.message);
        throw e;  // Relançando o erro
    }
};

// Closing the connection with mongoDB
const closeDbConnection = async () => {
    await mongoose.disconnect();
    console.log('Database connection closed');
};

module.exports = {
    openDbConnection,
    closeDbConnection,
    ...chargingStationModule,
    ...usersInformationModule,
};
