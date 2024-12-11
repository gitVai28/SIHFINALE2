import React from 'react';
import DisasterAlert from '../components/DisasterAlert';
import GoogleMapComponent from '../components/GoogleMapComponent';

const Home = () => {
  return (
    <div className="flex h-screen">
      <DisasterAlert />
      <GoogleMapComponent />
    </div>
  );
};

export default Home;