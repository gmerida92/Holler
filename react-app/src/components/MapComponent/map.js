import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

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

    const business = useSelector((state) => state.business)
    console.log('\n\n', 'HERE!', business, '\n\n')
    console.log('\n\n', 'HERE!', Object.keys(business), '\n\n')

    return (
        // Important! Always set the container height explicitly

        <div className="map_page__container" style={{ position: 'sticky', top: 110 }}>

            <div style={{ height: '900px', width: '100vh' }}>
                {isLoaded && <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={11}
                    center={currentPosition}
                    onUnmount={onUnmount}
                >
                    {Object.keys(business).map((businessId) => {
                        return (
                            <Marker key={businessId}
                                position={{ lat: business[businessId].latitude, lng: business[businessId].longitude }}
                                title={business[businessId].name}
                                icon={{
                                    path: 'M 100 100 L 300 100 L 200 300 z',
                                    fillColor: 'red',
                                    fillOpacity: 1,
                                    scale: .2,
                                    strokeColor: 'gold',
                                    strokeWeight: 2
                                }}
                                streetView={false} />
                        )
                    })}
                </GoogleMap>}
            </div>

        </div>
    );

}

export default MapPageA