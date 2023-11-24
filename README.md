# EcoPower

## Idea 
The primary goal of the application is to understand how it can interact 
with clients, enabling them to identify stations on the map and view their 
historical charging data at each station. Development is ongoing, with the 
creation of a homepage and its buttons still pending, along with a login page 
to identify each user. Additional features and tools are also under consideration.

## Database
Currently, the database is populated with two collections, #chargingStations
and #users.
    
    #chargingStations collection with details about each charging station
    "_id": {
        "$oid": "6554a412b9063d51970f7639"
    },
    "coord": {
        "lat": 47.8215,
        "lng": 13.025
    },
    "address": "Bessarabierstraße 59, 5020 Salzburg, Áustria",
    "connectors": [
        {
        "connector": "CHAdeMo",
        "quantity": 4,
        "power": "DC from 50kW to 100kW"
        },
        {
        "connector": "GB/T",
        "quantity": 4,
        "power": "AC up to 25kW"
        }
    ],
    "rating": 4.7 (it comes from an average..)


    #users collection with details about each user and its historical in the
    charging stations

    "name": "Pedro Afonso Fatori Maldonado",
    "document": "12345678",
    "contact": "111333555",
    "email": "ppp@hotmail.com",
    "birthday": "1997-10-30T14:10:30.000Z",
    "car": "Citroen Ami",
    "chargers": [
        {
        "date": "2020-05-18T14:10:30.000Z",
        "coord": {
            "lat": 47.8215,
            "lng": 13.025
        },
        "energy": 30,
        "price": 12,
        "place": "Public Charging"
        }...
    ]
To use the database, you have to create a .env file, inside src folder. For instance: 
DB_PASSWORD=yourDatabasePassword

## How to use the application
If you click on a charging station marker on the map, for example "Munich" or "Salzburg", 
you can view information about the address and plugs at this location, as well as the 
average rating given by users, and the logged client's history at this charging station. 
Additionally, it is possible to search for locations through the search box, enabling the 
identification of nearby charging locations. Both functionalities, map viewing and searching, 
are made possible due to Google Maps APIs.

To use the API, you have to create a .env file, inside frontend folder. For instance: 
REACT_APP_GOOGLE_MAPS_API_KEY=yourAPIPassword

## Getting started
Download node_modules (npm install) inside frontend and backend folders
To start the backend: Enter in backend/src folder in terminal and write "node index.js"
To start the frontend: Enter in frontend folder in terminal and write "npm start"

obs: if the charging station marks doesnt appear after the page renderization, 
try to reload the page.
