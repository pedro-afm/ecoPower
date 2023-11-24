import { useState, useEffect } from 'react';

// To fetch charging station information into database
const useChargingStations = () => {
    const [allStations, setAllStations] = useState([]);
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/getChargingStations',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status}`);
                }
                const data = await response.json();
                setAllStations(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };
        fetchStations();
    }, []);
    return allStations;
};
export default useChargingStations;
