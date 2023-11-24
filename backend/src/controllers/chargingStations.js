const {ChargingStations} = require('../db/db')

// Fetching charging stations data to send it back to the frontend
const getChargingStationsController = async (req, res) =>{
    try {
        const chargingStations = await ChargingStations.find({});
        if (chargingStations.length === 0) {
            return res.status(404).json({ message: 'No charging stations found' });
        }
        res.json(chargingStations);
    } catch (error) {
        console.error("Error fetching charging station data from the database: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getChargingStationsController,
}