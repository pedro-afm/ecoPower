import { useState } from 'react';

// To convert the wrote location into its coordinates, and relocate the
// map in the searching result
const useGeocoder = (googleMapsApi) => {
    const [mapCenter, setMapCenter] = useState(null);
    const [zoom, setZoom] = useState(10);
    const geocodeAddress = async (address) => {
        const geocoder = new googleMapsApi.maps.Geocoder();
        try {
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK") {
                    const location = results[0].geometry.location;
                    setMapCenter({ lat: location.lat(), lng: location.lng() });
                    setZoom(8)
                } else {
                    throw new Error(`Geocoding failed: ${status}`);
                }
            });
        } catch (error) {
            console.error("Geocoding error:", error);
        }
    };
    return { geocodeAddress, mapCenter, zoom };
};
export default useGeocoder;
