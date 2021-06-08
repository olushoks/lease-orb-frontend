import { useState, useRef } from "react";
import Geocode from "react-geocode";
import LeaseForm from "../action/LeaseForm";
import MapWithAutoComplete from "../map/MapWithAutoComplete";
import APIKEY from "../../key";
import transformString from "../../helper/stringTransformer";

// SET API FOR USE WITH GEOCODE
Geocode.setApiKey(APIKEY);

const ListLease = (props) => {
  const { closeForm, submitLease, listedLease } = props;
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const rentRef = useRef(null);
  const availableDateRef = useRef(null);
  const additionalInfoRef = useRef(null);

  const alertRef = useRef(null);

  // STATE VARIABLES
  const [location, setLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    lat: 0,
    lng: 0,
  });

  const [mapLocation, setMapLocation] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });

  // SUBMIT LEASEDETAILS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !nameRef.current.value ||
      !addressRef.current.value ||
      !rentRef.current.value ||
      rentRef.current.value === "0" ||
      !availableDateRef.current.value
    ) {
      alertRef.current.innerHTML =
        "One or more fields needs to be filled before  submitting";
      alertRef.current.className = "error";
      setTimeout(clearAlert, 3000);
    } else if (listedLease.length > 0) {
      alertRef.current.innerHTML =
        "You cannot have more than one active lease listed";
      alertRef.current.className = "error";
      setTimeout(clearAlert, 3000);
    } else {
      alertRef.current.innerHTML = "Lease has been succesfully submitted";
      alertRef.current.className = "success";
      setTimeout(clearAlert, 3000);
      const additionalInfo =
        additionalInfoRef.current.value === ""
          ? " "
          : additionalInfoRef.current.value;
      submitLease({
        ...location,
        name: nameRef.current.value,
        address: addressRef.current.value,
        rent: rentRef.current.value,
        availableDate: availableDateRef.current.value,
        additionalInfo,
      });
      nameRef.current.value = "";
      addressRef.current.value = "";
      rentRef.current.value = null;
      availableDateRef.current.value = "";
      additionalInfoRef.current.value = "";
    }
  };

  const clearAlert = () => {
    alertRef.current.innerHTML = "";
  };

  const getState = (addressArray) => {
    let state;
    const [stateDetails] = addressArray.filter((address) => {
      return address.types[0] === "administrative_area_level_1";
    });
    state = stateDetails === undefined ? "" : stateDetails.long_name;
    state = transformString(state);
    return state;
  };

  const getCity = (addressArray) => {
    let city;
    const [cityDetails] = addressArray.filter((address) => {
      return address.types[0] === "locality";
    });
    city = cityDetails === undefined ? "" : cityDetails.long_name;
    city = transformString(city);
    return city;
  };

  const getZip = (addressArray) => {
    let zipCode;
    const [zipCodeDetails] = addressArray.filter((address) => {
      return address.types[0] === "postal_code";
    });
    zipCode = zipCodeDetails === undefined ? "" : zipCodeDetails.long_name;
    zipCode = transformString(zipCode);
    return zipCode;
  };

  //GET LATITUDE AND LONGIITUDE WHEN USER MAKE A SELECTION FROM AUTOCOMPLETE
  const onPlaceSelected = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    nameRef.current.value = place.name;
    addressRef.current.value = place.formatted_address;

    const addressArray = place.address_components;
    const city = getCity(addressArray);
    const state = getState(addressArray);
    const zipCode = getZip(addressArray);
    setMapLocation({ lat, lng });
    setLocation({
      ...location,
      name: place.name,
      address: place.formatted_address,
      city,
      state,
      zipCode,
      lat,
      lng,
    });
  };

  return (
    <div className="list-lease-section">
      <span onClick={closeForm}>
        <i className="fas fa-window-close close-btn"></i>
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
          location={{
            nameRef,
            addressRef,
            rentRef,
            availableDateRef,
            additionalInfoRef,
          }}
          handleSubmit={handleSubmit}
          alert={alertRef}
        />
      </div>
    </div>
  );
};

export default ListLease;
