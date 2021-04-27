/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
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

import LeaseForm from "../action/LeaseForm";

import APIKEY from "../../key";

// SET API FOR USE WITH GEOCODE
Geocode.setApiKey(APIKEY);

// GOOD MAP URL WITH API KEY
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing,places`;

const Map = ({ closeForm }) => {
  // STATE VARIABLES
  const [location, setLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [mapPosition, setMapPosition] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });

  // GET USERS CURRENT LOCATION WHEN COMPONENT RENDERS
  useEffect(() => {
    if (navigator.location) {
      navigator.location.getCurrentPosiition(
        (position) => {
          setMapPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          Geocode.fromLatLng(
            this.position.coords.latitude,
            this.position.coords.longitude
          )
            .then((response) => {
              console.log(response.results[0].address_components);
              const address = response.results[0].formatted_address;
              const addressArray = response.results[0].address_components;
              const city = getCity(addressArray);
              const state = getState(addressArray);
              const zipCode = getZip(addressArray);
              setLocation({ address, city, state, zipCode });
            })
            .catch((err) => console.log(err));
        }
      );
    }
  }, []);

  const getState = (addressArray) => {
    let state;
    const [stateDetails] = addressArray.filter((address) => {
      if (address.types[0] === "administrative_area_level_1") return true;
    });
    state = stateDetails === undefined ? "" : stateDetails.long_name;
    return state;
  };

  const getCity = (addressArray) => {
    let city;
    const [cityDetails] = addressArray.filter((address) => {
      if (address.types[0] === "locality") {
        return true;
      }
    });
    city = cityDetails === undefined ? "" : cityDetails.long_name;
    return city;
  };

  const getZip = (addressArray) => {
    let zipCode;
    const [zipCodeDetails] = addressArray.filter((address) => {
      if (address.types[0] === "postal_code") return true;
    });
    zipCode = zipCodeDetails === undefined ? "" : zipCodeDetails.long_name;
    return zipCode;
  };

  // GET LATITUDE AND LONGIITUDE WHEN USER GRAGS MARKER
  // const onEndMarkerDrag = async (event) => {
  //   let newLat = event.latLng.lat();
  //   let newLng = event.latLng.lng();

  //   await geocode
  //     .fromLatLng(newLat, newLng)
  //     .then((response) => {
  //       console.log(response.results[0].address_components);
  //       const address = response.results[0].formatted_address;
  //       const addressArray = response.results[0].address_components;
  //       const city = getCity(addressArray);
  //       const state = getState(addressArray);
  //       const zipCode = getZip(addressArray);

  //       setLocation({ address, city, state, zipCode });
  //       setMarkerPosition({ lat: newLat, lng: newLng });
  //       setMapPosition({ lat: newLat, lng: newLng });
  //       console.log(location);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // GET LATITUDE AND LONGIITUDE WHEN USER MAKE A SELECTION FROM AUTOCOMPLETE
  const onPlaceSelected = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const name = place.name;
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const city = getCity(addressArray);
    const state = getState(addressArray);
    const zipCode = getZip(addressArray);

    setLocation({ name, address, city, state, zipCode });
    setMarkerPosition({ lat, lng });
    setMapPosition({ lat, lng });
  };

  // MAP WRAPPER
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
        >
          <Marker
            draggable={false}
            position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
          >
            <InfoWindow>
              <div>{location.name}</div>
            </InfoWindow>
          </Marker>
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
            // defaultValue="Raleigh"
          />
        </GoogleMap>
        {<LeaseForm location={location} />}
      </>
    ))
  );

  return (
    <>
      <span onClick={closeForm}>
        <i className="fas fa-window-close"></i>
      </span>
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
    </>
  );
};

export default Map;
