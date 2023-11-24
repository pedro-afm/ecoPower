const chargingStationsModule = require('./chargingStations');
const usersInformationModule = require('./usersInformation')

module.exports = {
    ...chargingStationsModule,
    ...usersInformationModule,
}