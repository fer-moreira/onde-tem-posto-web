import { useEffect, useRef, useState } from 'react';
import { Marker } from 'react-leaflet';
import L from "leaflet";
import MarkerIcon from "../../media/map/map_marker.png";

export default function CustomMarker(props) {
  const [markerIcon, setMarkerIcon] = useState(null);
  const [markerData, setmarkerData] = useState(null);

  useEffect(() => {
    setmarkerData(props.markerData);

    // Load custom marker icon
    const customIcon = L.icon({
      iconUrl: MarkerIcon,
      iconSize: [40, 45],
      iconAnchor: [40 / 2, 45],
      className: 'map-marker-custom'
    });

    setMarkerIcon(customIcon);
  }, []);

  return (
    <>
      { markerIcon &&
        <Marker
          position={[
            markerData.location.lat,
            markerData.location.lng
          ]}
          icon={markerIcon}
          eventHandlers={props.eventHandlers}
        />
      }
    </>
  );
}