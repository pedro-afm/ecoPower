import { useState, useEffect } from 'react';

// To fetch user information for the comsumption calculation
const useUserData = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/getUserInformation',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status}`);
                }
                const userInformation = await response.json();
                setUserData(userInformation);
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };
        fetchUserInformation();
    }, []);
    return userData;
};
export default useUserData;

