/* eslint-disable array-callback-return */
/*************************************************************** */
import { useState } from "react";
import Geocode from "react-geocode";
import LeaseForm from "../action/LeaseForm";
import MapWithAutoComplete from "../map/MapWithAutoComplete";

import APIKEY from "../../key";
import transformString from "../../helper/stringTransformer";

// GOOGLE MAP URL WITH API KEY
// const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing,places`;

// SET API FOR USE WITH GEOCODE
Geocode.setApiKey(APIKEY);

const ListLease = (props) => {
  const { closeForm, submitLease } = props;
  // STATE VARIABLES
  const [location, setLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    lat: null,
    lng: null,
    additionalInfo: "",
    availableDate: "",
    rent: null,
  });
  const [mapLocation, setMapLocation] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });
  const [message, setMessage] = useState("");

  // SUBMIT LEASEDETAILS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !location.name ||
      !location.address ||
      !location.availableDate ||
      !location.rent
    ) {
      setMessage("One or more fields needs to be filled before  submitting");
    } else {
      setMessage("Lease has been succesfully submitted");
      submitLease(location);
      setLocation({
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        lat: null,
        lng: null,
        additionalInfo: "",
        availableDate: "",
        rent: "",
      });
    }

    //   Geocode.fromAddress(location.address).then(
    //     (response) => {
    //       const { lat, lng } = response.results[0].geometry.location;
    //       console.log(lat, lng);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  };

  // HANDLE FORM INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  /***ADDED */
  const getState = (addressArray) => {
    let state;
    const [stateDetails] = addressArray.filter((address) => {
      if (address.types[0] === "administrative_area_level_1") return true;
    });
    state = stateDetails === undefined ? "" : stateDetails.long_name;
    state = transformString(state);
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
    city = transformString(city);
    return city;
  };

  const getZip = (addressArray) => {
    let zipCode;
    const [zipCodeDetails] = addressArray.filter((address) => {
      if (address.types[0] === "postal_code") return true;
    });
    zipCode = zipCodeDetails === undefined ? "" : zipCodeDetails.long_name;
    zipCode = transformString(zipCode);
    return zipCode;
  };

  //GET LATITUDE AND LONGIITUDE WHEN USER MAKE A SELECTION FROM AUTOCOMPLETE
  const onPlaceSelected = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const name = place.name;
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const city = getCity(addressArray);
    const state = getState(addressArray);
    const zipCode = getZip(addressArray);
    setMapLocation({ lat, lng });
    setLocation({ ...location, name, address, city, state, zipCode, lat, lng });
  };
  /***END */

  return (
    <>
      <span onClick={closeForm}>
        <i className="fas fa-window-close"></i>
      </span>
      <div>
        <MapWithAutoComplete
          mapLocation={mapLocation}
          location={location}
          onPlaceSelected={onPlaceSelected}
        />
      </div>
      <div>
        <LeaseForm
          location={location}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          message={message}
        />
      </div>
    </>
  );
};

export default ListLease;
