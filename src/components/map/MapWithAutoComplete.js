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

import APIKEY from "../../key";
// GOOGLE MAP URL WITH API KEY
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing,places`;

// SET API FOR USE WITH GEOCODE
Geocode.setApiKey(APIKEY);

/*** END OF IMPORTS *****/

const MapWithAutoComplete = (props) => {
  const { mapLocation, location, onPlaceSelected } = props;

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
      <div
        style={{
          padding: "1rem",
          margin: "0 auto",
          maxWidth: 1000,
        }}
      >
        <Descriptions bordered>
          <Descriptions.Item label="Address">
            {location.address}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <MapWithAMarker
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div
            style={{
              height: `400px`,
              width: "50rem",
              border: `0.3rem inset #6f0fa7`,
            }}
          />
        }
        mapElement={<div style={{ height: `100%`, maxWidth: "50rem" }} />}
      />
    </div>
  );
};

export default MapWithAutoComplete;
