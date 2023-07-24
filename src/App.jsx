import { useRef, useState } from "react";
import "./App.css";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const App = () => {
  const [enterLocation, setEnterLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const searchLocation = useRef(null);
  const mapRef = useRef(null);

  const onPlaceChanged = () => {
    if (searchLocation.current) {
      const place = searchLocation.current.getPlace();
      if (place && place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setEnterLocation(location);
        if (mapRef.current) {
          const map = mapRef.current;
          map.panTo(location);
        }
        console.log("seach location", searchLocation.current);
        console.log("Enter location: ", enterLocation);

        console.log("Selected location:", place.name || "No name available");
        console.log("Latitude:", location.lat);
        console.log("Longitude:", location.lng);
      }
    }
  };

  const onMapClick = async (e) => {
    try {
      const clickedLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

      // Simulate an asynchronous operation, e.g., an API call
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=true&key=AIzaSyDdWcQ65ef4ZvC-gBq41mP9kjnpy0Pnufc`,
        {
          "Access-Control-Allow-Origin": "*",
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data));

      // Update the state based on the response or any other async logic
      setEnterLocation(clickedLocation.lat);
      // setEnterLocation();

      setEnterLocation(clickedLocation.toString());

      console.log("response Data:", response);
      console.log("Data value:", data.body);
      console.log("Clicked location:");
      console.log("Latitude:", clickedLocation.lat);
      console.log("Longitude:", clickedLocation.lng);

      // Handle the data from the API response or any other async logic
      console.log("API Data:", data);
    } catch (error) {
      // Handle any errors that might occur during the async operation
      console.error("Error:", error);
    }
  };

  const center = { lat: 33.583221, lng: 73.055115 };

  const handleSearchClick = () => {
    setShowMap(true);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDdWcQ65ef4ZvC-gBq41mP9kjnpy0Pnufc"
      // librariesValue
      libraries={["places"]}
    >
      <div className="map-section">
        <div className="input-location">
          <Autocomplete
            onLoad={(autocomplete) => (searchLocation.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter location"
              onClick={handleSearchClick}
            />
          </Autocomplete>
          <button onClick={onPlaceChanged}>Search</button>
        </div>
        {showMap && (
          <div className="show-google-map">
            <GoogleMap
              ref={mapRef}
              center={center}
              zoom={15}
              mapContainerClassName="map-container"
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              onClick={onMapClick}
            >
              {enterLocation && <Marker position={enterLocation} />}
            </GoogleMap>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default App;
