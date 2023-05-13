import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';


import CustomMarker from './components/Marker';

// Data
import markersData from "../media/markers_data.json";

import StationDetails from "./components/Details/Details";
import Localizator from "./components/Localizator";
import Searchbar from "./components/SearchBar";

export default function Map() {
    // map variables
    const [style] = useState("light_all");
    const [zoom] = useState(15);
    const [scale] = useState("@2x");

    // hooks
    const [showDetails, setShowDetail] = useState(false);
    const [currentCordinates, setCurrentCordinates] = useState(null);
    const mapRef = useRef(null);

    // events
    const handleMarkerClick = (data) => {
        console.log(`Marker clicked at ${data.name}`);
        setShowDetail(true);
    };

    const handleLocalizeMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentCordinates([latitude, longitude]);
                updateMapView();

                console.log(currentCordinates);
            }, () => {
                console.log('Não foi possível obter a localização atual.');
            });
        }
    }

    const updateMapView = () => {
        if (mapRef.current) {
            mapRef.current.setView(currentCordinates, zoom, {
                animate: mapRef.current
            });
        }
    }

    useEffect(() => {
        handleLocalizeMe();
    }, []); 

    return (
        <>
            <div className='overlay-container disable-pointer'>
                <Searchbar />
                <Localizator locateEvent={() => { handleLocalizeMe() }} />
                <StationDetails
                    show={showDetails}
                    backEvent={() => { setShowDetail(false) }}
                    locateEvent={() => { handleLocalizeMe() }}
                />
            </div>

            {
                currentCordinates && (
                    <MapContainer ref={mapRef} center={currentCordinates} zoom={zoom} zoomControl={false} doubleClickZoom={false} >
                        {/* <TileLayer url={`https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}${scale}.png`} /> */}
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {/* <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" /> */}
                        {/* <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" /> */}

                        
                        {markersData.markers.map((data) => (
                            <CustomMarker key={data.id} markerData={data} eventHandlers={{ click: (e) => { handleMarkerClick(data) } }} />
                        ))}
                    </MapContainer>
                )
            }
        </>
    );
}