require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { openDbConnection, closeDbConnection } = require('./db/db')
const { getChargingStationsController, getUsersInformationController } = require('./controllers')

// Usando CORS para todas as rotas
app.use(cors());

// Definindo a rota antes de iniciar o servidor
app.get('/api/getChargingStations', getChargingStationsController);

// Definindo a rota para o user logado
app.get('/api/getUserInformation', getUsersInformationController)

// Inicializando o servidor
const server = app.listen(8081, async () => {
    db = await openDbConnection();
    console.log('Server is running on port 8081');
});

// Lidando com o fechamento do servidor
server.on('close', async () => {
    await closeDbConnection();
    console.log('Server closed and database connection closed');
})

