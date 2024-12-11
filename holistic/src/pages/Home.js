import React from 'react';
import DisasterAlert from '../components/DisasterAlert';
import GoogleMapComponent from '../components/GoogleMapComponent';
// import Disater from '../components/Disater'

const Home = () => {
  return (
    <div className="flex h-screen">
      <DisasterAlert />
      <GoogleMapComponent />
      {/* <Disater/> */}
    </div>
  );
};

export default Home;