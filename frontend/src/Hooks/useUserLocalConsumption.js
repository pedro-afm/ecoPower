import { useState } from 'react';

// Calculation of logged user, based on each charging location
const useUserLocalConsumption = (allStations, userData) => {
    const [cost, setCost] = useState(0);
    const [energySpent, setEnergySpent] = useState(0);
    const calculateConsumption = (selectedMarker) => {
        try {
            const coord = allStations[selectedMarker].coord;
            const chargings = userData.map(user => {
                return user.chargers.filter(charger => (
                    charger.coord.lat === coord.lat && charger.coord.lng === coord.lng
                ));
            }).flat();

            let totalEnergy = 0;
            let totalCost = 0;
            chargings.forEach(charge => {
                if (!isNaN(charge.energy) && !isNaN(charge.price)) {
                    totalCost += Number(charge.price);
                    totalEnergy += Number(charge.energy);
                }
            });
            setCost(totalCost);
            setEnergySpent(totalEnergy);
        } catch (e) {
            console.error("An error has occurred trying to find the user consumption", e);
        }
    };
    return { calculateConsumption, cost, energySpent };
};

export default useUserLocalConsumption;
