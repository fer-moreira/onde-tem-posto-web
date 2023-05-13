import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapTheme from "./MapTheme.json";

import StationMarker from './components/Marker';
import StationDetails from "./components/Details/Details";
import Localizator from "./components/Localizator";
import Searchbar from "./components/SearchBar";

import markersData from "../media/markers_data.json";

const mapOptions = {
  styles: MapTheme,
  disableDefaultUI: true,
  fullscreenControl: false,
  clickableIcons: false,
  streetViewControl: false
};

function Map() {
  const [showDetails, setShowDetail] = useState(false);
  const [currentCordinates, setCurrentCordinates] = useState({});
  const mapRef = useRef(null);

  const GetCurrentCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const _coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        setCurrentCordinates(_coords);
      }, () => {
        console.log('Não foi possível obter a localização atual.');
      });
    }
  }

  useEffect(() => {
    GetCurrentCoords();
  }, [])


  const HandleMarkerClick = (data) => {
    console.log(data.name);
  }

  return (
    <>
      <div className='overlay-container disable-pointer'>
        <Searchbar />
        <Localizator locateEvent={() => { GetCurrentCoords() }} />
        <StationDetails
          show={showDetails}
          backEvent={() => { setShowDetail(false) }}
          locateEvent={() => {
            mapRef.current.panTo(currentCordinates)
          }}
        />
      </div>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: '100vw', height: '100vh' }}
          center={currentCordinates} zoom={15}
          options={mapOptions}
          onLoad={(map) => { mapRef.current = map; }}
        >
          {markersData.markers.map((m) => (
            <StationMarker
              key={m.id}
              position={{ lat: m.location.lat, lng: m.location.lng }}
              onMarkerClick={() => { HandleMarkerClick(m) }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(Map);