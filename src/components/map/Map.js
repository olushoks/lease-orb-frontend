/* eslint-disable array-callback-return */
import React, { useState } from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import Geocode from "react-geocode";

import APIKEY from "../../key";

// SET API FOR USE WITH GEOCODE
Geocode.setApiKey(APIKEY);

// GOOD MAP URL WITH API KEY
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing,places`;

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });

  // MAP WRAPPER
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: markerPosition.lat, lng: markerPosition.lng }}
        >
          <Marker
            draggable={false}
            position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
          >
            <InfoWindow>
              <div>{"location"}</div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </>
    ))
  );

  return (
    <>
      <MapWithAMarker
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: "50rem" }} />}
        mapElement={<div style={{ height: `100%`, maxWidth: "50rem" }} />}
      />
    </>
  );
};

export default Map;
