import React from 'react';

import { MarkerF } from '@react-google-maps/api';

export default function StationMarker(props) {
  const markerOptions = {
    icon: {
      url: require("../../media/map/map_marker.png"),
      scaledSize: new window.google.maps.Size(30, 40),
    }
  };

  return (
    <MarkerF
      position={props.position}
      options={markerOptions}
      onClick={props.onMarkerClick}
    />
  );
}