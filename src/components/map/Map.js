import React, { Component, useState } from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import APIKEY from "../../key";

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing,places`;

const Map = () => {
  // STATE VARIABLES
  const [location, setLocation] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
  });
  const [zoom, setZoom] = useState({ zoom: 15, height: 400 });
  const [maxPosition, setMaxPosiition] = useState({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

  // GET LATITUDE AND LONGIITUDE
  const onEndMarkerDrag = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    console.log(newLat, newLng);
  };

  // MAP WRAPPER
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker
          draggable={true}
          onDragEnd={onEndMarkerDrag}
          position={{ lat: -34.397, lng: 150.644 }}
        >
          <InfoWindow>
            <div>My Map</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ))
  );

  return (
    <MapWithAMarker
      googleMapURL={googleMapURL}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default Map;
