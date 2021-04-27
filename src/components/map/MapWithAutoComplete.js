/* eslint-disable array-callback-return */
// import React, { useState } from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { Descriptions } from "antd";
//import LeaseForm from "../action/LeaseForm";

import APIKEY from "../../key";
// GOOGLE MAP URL WITH API KEY
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing,places`;

// SET API FOR USE WITH GEOCODE
Geocode.setApiKey(APIKEY);

/*** END OF IMPORTS *****/

/*************************************************************** */

const MapWithAutoComplete = (props) => {
  const { mapLocation, location, onPlaceSelected } = props;
  //STATE VARIABLES
  // const [location, setLocation] = useState({
  //   name: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   zipCode: "",
  //   lat: 39.8097343,
  //   lng: -98.5556199,
  //   additionalInfo: "",
  //   availableDate: "",
  //   rent: null,
  // });

  // const [markerPosition, setMarkerPosition] = useState({
  //   lat: 39.8097343,
  //   lng: -98.5556199,
  // });

  // const getState = (addressArray) => {
  //   let state;
  //   const [stateDetails] = addressArray.filter((address) => {
  //     if (address.types[0] === "administrative_area_level_1") return true;
  //   });
  //   state = stateDetails === undefined ? "" : stateDetails.long_name;
  //   return state;
  // };

  // const getCity = (addressArray) => {
  //   let city;
  //   const [cityDetails] = addressArray.filter((address) => {
  //     if (address.types[0] === "locality") {
  //       return true;
  //     }
  //   });
  //   city = cityDetails === undefined ? "" : cityDetails.long_name;
  //   return city;
  // };

  // const getZip = (addressArray) => {
  //   let zipCode;
  //   const [zipCodeDetails] = addressArray.filter((address) => {
  //     if (address.types[0] === "postal_code") return true;
  //   });
  //   zipCode = zipCodeDetails === undefined ? "" : zipCodeDetails.long_name;
  //   return zipCode;
  // };

  //GET LATITUDE AND LONGIITUDE WHEN USER MAKE A SELECTION FROM AUTOCOMPLETE
  // const onPlaceSelected = (place) => {
  //   const lat = place.geometry.location.lat();
  //   const lng = place.geometry.location.lng();

  //   const name = place.name;
  //   const address = place.formatted_address;
  //   const addressArray = place.address_components;
  //   const city = getCity(addressArray);
  //   const state = getState(addressArray);
  //   const zipCode = getZip(addressArray);

  //   setMarkerPosition({ lat, lng });
  //   setLocation({ ...location, name, address, city, state, zipCode, lat, lng });
  // };

  // MAP WRAPPER
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: mapLocation.lat, lng: mapLocation.lng }}
        >
          <Marker
            draggable={false}
            position={{ lat: mapLocation.lat, lng: mapLocation.lng }}
          >
            <InfoWindow>
              <div>{location.name}</div>
            </InfoWindow>
          </Marker>
          <div>
            <Autocomplete
              style={{
                width: "100%",
                height: "2rem",
                paddingLeft: "16px",
                marginTop: "0.5rem",
                marginBottom: "5rem",
              }}
              onPlaceSelected={onPlaceSelected}
              options={{
                types: [],
                componentRestrictions: { country: "us" },
              }}
            />
          </div>
        </GoogleMap>
      </>
    ))
  );

  return (
    <div>
      <div style={{ padding: "1rem", margin: "0 auto", maxWidth: 1000 }}>
        <Descriptions bordered>
          <Descriptions.Item label="Address">
            {location.address}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <MapWithAMarker
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: "50rem" }} />}
        mapElement={<div style={{ height: `100%`, maxWidth: "50rem" }} />}
      />
    </div>
  );
};

export default MapWithAutoComplete;
