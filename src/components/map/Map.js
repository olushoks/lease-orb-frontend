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

// GOOGLE MAP URL WITH API KEY
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing,places`;

const Map = ({ searchResult }) => {
  // MAP WRAPPER
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <div>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 39.8097343, lng: -98.5556199 }}
        >
          {!searchResult
            ? null
            : searchResult.map((result, index) => {
                return (
                  <Marker
                    draggable={false}
                    position={{ lat: result.lat, lng: result.lng }}
                    key={index}
                  >
                    <InfoWindow>
                      <div>{result.name}</div>
                    </InfoWindow>
                  </Marker>
                );
              })}
        </GoogleMap>
      </div>
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
