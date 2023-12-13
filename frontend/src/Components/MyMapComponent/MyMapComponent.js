import React, { useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, } from '@react-google-maps/api';
import { Container, Row, Col } from 'react-bootstrap';
import './MyMapComponent.css';
import { CCS1, CCS2, CHAdeMo, GBTAC, TIPO2, euro, energy2 } from '../../Images/exportImages';
import { useChargingStations, useGeocoder, useUserData, useUserLocalConsumption } from '../../Hooks/indexHooks'
import Navbar from '../Navbar/Navbar';

//import AuthProvider from '../../TokenReducer/AuthProvider';

// The key to fetch the API of Google maps
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Rendering the component
const MyMapComponent = () => {
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    });

    // State variables to manage the data of the component
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [searchedAddress, setSearchedAddress] = useState('');
    const connectors = [
        { conec: "CCS1", img: CCS1 },
        { conec: "CCS2", img: CCS2 },
        { conec: "CHAdeMo", img: CHAdeMo },
        { conec: "GB/T", img: GBTAC },
        { conec: "TIPO 2", img: TIPO2 },
    ];
    const mapRef = useRef(null);
    const allStations = useChargingStations();
    const userData = useUserData();
    const { geocodeAddress, mapCenter, zoom } = useGeocoder(window.google);
    const { calculateConsumption, cost, energySpent } = useUserLocalConsumption(allStations, userData);

    // Handle marker click event and calls the another function to calculate user consumption
    async function handleMarkerClick(marker) {
        setSelectedMarker(marker);
        calculateConsumption(marker);
    }

    // Handle the searching address when the customer clicks the button
    async function handleSearchedAddress() {
        if (!isLoaded || !searchedAddress) return;
        geocodeAddress(searchedAddress);
        setSearchedAddress('');
    }

    // Set the loaded map reference
    const handleLoadMap = (map) => {
        mapRef.current = map;
    };

    return (
        <div>
            <Navbar></Navbar>
            <Container fluid style={{ padding: '0px', width: '80%' }}>

                <Row style={{ height: '100%', marginBottom: '20px' }}>
                    <Col xs={12} lg={6}>
                        <Row style={{ width: '100%' }}>
                            <div className='div-box'>
                                <h1>Charging Station Information</h1>
                                <div className='div-box2' style={{ marginTop: '15px' }}>
                                    <div style={{ marginLeft: '20px' }}>
                                        {/* Show selected charging station details */}
                                        {selectedMarker !== null && allStations[selectedMarker] ? (
                                            <Row>
                                                <Row>
                                                    <Col lg={1} className="circle">
                                                        {allStations[selectedMarker].rating}
                                                    </Col>
                                                    <Col className='infoMarker-div'>
                                                        <p style={{ marginTop: '40px' }}>{allStations[selectedMarker].address}</p>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: '20px' }}>
                                                    {allStations[selectedMarker].connectors.map((connector) => (
                                                        <Row>
                                                            <Col lg={2}></Col>
                                                            <Col style={{ display: 'flex', alignItems: 'center', marginRight: '30px', marginLeft: '20px' }} lg={1}>{connectors.map((conec, idx) => (
                                                                conec.conec === connector.connector ? (
                                                                    <img style={{ height: '50px', width: '50px' }} src={conec.img}></img>
                                                                ) : <></>
                                                            ))}
                                                            </Col>
                                                            <Col value={connector._id}>
                                                                <p className='connectors'>Connector: <strong>{connector.connector}</strong></p>
                                                                <p className='connectors'>Quantity: <strong>{connector.quantity}</strong></p>
                                                                <p className='connectors'>Power: <strong>{connector.power}</strong></p>
                                                            </Col>
                                                            <Col lg={1}></Col>
                                                        </Row>
                                                    ))}
                                                </Row>
                                                <Row style={{ marginTop: '30px' }}>
                                                    <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#375f68', textAlign: 'center' }}>Enhance your experience at this energy station</h2>
                                                    <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                                        <p>Energy</p>
                                                        <div className='box'>
                                                            <p style={{ fontSize: '40px', marginTop: '15px', marginRight: '10px' }}>{energySpent}<span style={{ fontSize: '20px' }}>kWh</span></p>
                                                            <img style={{ height: '40px' }} src={energy2} alt="Energy Icon" />
                                                        </div>
                                                    </Col>
                                                    <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                                        <p style={{ textAlign: 'left', fontSize: '20px' }}>Cost</p>
                                                        <div className='box'>
                                                            <p style={{ fontSize: '40px', marginTop: '17px', marginRight: '10px' }}>{cost}</p>
                                                            <img style={{ height: '30px' }} src={euro} alt="Euro Icon" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Row>
                                        ) : (
                                            <p>Select a station to view details...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <Row></Row>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Row>
                            <Row className="search-box" style={{ marginTop: '18px', border: 'none', margin: 'none', padding: 'none', alignItems: 'center', justifyContent: 'center' }}>
                                <Col xs={9} lg={9} style={{ alignItems: 'center' }}>
                                    <input className='custom-input' value={searchedAddress} style={{ height: '50px', display: 'flex', borderRadius: '30px', alignItems: 'center', backgroundColor: '#e4e0e0ee', border: '1px solid grey', paddingLeft: '20px', width: '100%' }} type="text" placeholder="Enter the address..." onChange={(e) => setSearchedAddress(e.target.value)} />
                                </Col>
                                <Col xs={3} lg={3} style={{ textAlign: 'center' }}>
                                    <button className='button btn-secondary' style={{ height: '40px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey', color: 'white' }} onClick={handleSearchedAddress}>Search</button>
                                </Col>
                            </Row>


                            <div style={{ height: '100%' }}>
                                {/* Display Google Map */}

                                {isLoaded ? (
                                    <>
                                        <GoogleMap
                                            onLoad={handleLoadMap}
                                            ref={mapRef}
                                            mapContainerStyle={{ width: '100%', height: '70vh', marginBottom: '20px', padding: '0px', marginTop: '20px', borderRadius: '10px' }}
                                            center={mapCenter || { lat: 49.460983, lng: 11.061859 }}
                                            zoom={zoom}
                                        >
                                            {allStations.map((stations, index) => (
                                                <Marker key={index} position={stations.coord} onClick={(e) => handleMarkerClick(index)} />
                                            ))}
                                        </GoogleMap>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyMapComponent;