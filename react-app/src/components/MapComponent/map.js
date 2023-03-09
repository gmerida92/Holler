import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


function MapPageA() {


    //This sets the center of the map. This must be set BEFORE the map loads

    const [currentPosition, setCurrentPosition] = useState({ lat: 34.0522, lng: -118.2437 })

    // This is the equivalent to a script tag

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
    })

    const containerStyle = {
        width: '100vh',
        height: '900px',
    };

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    return (
        // Important! Always set the container height explicitly

        <div className="map_page__container" style={{position:'sticky', top: 110}}>

            <div style={{ height: '900px', width: '100vh' }}>
                {isLoaded && <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={11}
                    center={currentPosition}
                    onUnmount={onUnmount}
                >
                </GoogleMap>}
            </div>

        </div>
    );

}

export default MapPageA