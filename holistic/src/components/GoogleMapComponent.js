import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Import the JSON data directly
import disasterData from '../collaspe.json'; // Update the path according to your directory structure

const containerStyle = {
  width: '50%',
  height: '100vh',
  float: 'left',
};

// Coordinates for known locations
const locationCoordinates = {
  Delhi: { lat: 28.6139, lng: 77.209 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  // Add more known locations as necessary
};

const GoogleMapComponent = () => {
  const [disasters, setDisasters] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Directly use the imported data
    const uniqueLocations = disasterData.filter(
      (item, index, self) =>
        self.findIndex((t) => t.location === item.location) === index
    );
    setDisasters(uniqueLocations);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCaUq5IndxjZNdgvbtyAOUHr1IakGUn6Aw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 20.5937, lng: 78.9629 }} // Centered on India
        zoom={5}
      >
        {/* Render markers for unique locations */}
        {disasters.map((disaster, index) => (
          <Marker
            key={index}
            position={locationCoordinates[disaster.location]}
            animation="BOUNCE"
            onClick={() => setSelectedLocation(disaster)}
          />
        ))}

        {/* Show InfoWindow when a marker is clicked */}
        {selectedLocation && (
          <InfoWindow
            position={locationCoordinates[selectedLocation.location]}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h4>{selectedLocation.disaster_type}</h4>
              <p>{selectedLocation.content}</p>
              <p>
                <strong>Location:</strong> {selectedLocation.location}
              </p>
              <p>
                <strong>Date:</strong> {selectedLocation.date} <br />
                <strong>Time:</strong> {selectedLocation.time}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
