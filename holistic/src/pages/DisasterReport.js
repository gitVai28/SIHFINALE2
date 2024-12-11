import React, { useState, useEffect } from 'react';
import { AlertCircle, Waves, Thermometer } from 'lucide-react';

const disasterData = {
  Mumbai: [
    { time: '2:00 AM', situation: "Rainfall starts in the affected area, measured as light rain (e.g., 2-5 mm per hour) .Early warning systems may note minor changes, but no immediate flood threat is detected. Ground begins to absorb the rain; no significant water accumulation yet." },
    { time: '2:30 AM', situation: "Rainfall intensity increases to moderate levels (e.g., 10-15 mm per hour).Water begins to accumulate on streets or lower elevations, with drainage systems starting to get stressed." },
    { time: '3:00 AM', situation: "Rainfall escalates to heavy (e.g., 25-30 mm per hour).Water levels rise in streams, rivers, and drainage systems. Low-lying areas experience significant water buildup." },
    { time: '3:30 AM', situation: "Rainfall reaches severe intensity (e.g., 40+ mm per hour).Rivers and drainage systems approach capacity; water overflows in certain areas. Flash flood warnings may be issued." },
    { time: '4:00 AM', situation: ": Rainfall reaches severe intensity (e.g., 40+ mm per hour).Rivers and drainage systems approach capacity; water overflows in certain areas. Flash flood warnings may be issued." },
  ],
  Delhi: [
    { time: '1:00 PM', situation: "Temperature reaches around 35°C (95°F) with moderate humidity.Mild discomfort begins. People are advised to take precautions, like staying hydrated and avoiding direct sun exposure.The general population feels discomfort, but no serious health risks are present yet. Outdoor activities continue with minor disruptions." },
    { time: '1:30 PM', situation: 'Heatwave alert issued.\nResidents advised to stay indoors.' },
    { time: '2:00 PM', situation: 'Public advised to stay indoors.\nWear light clothing.' },
    { time: '2:30 PM', situation: 'Hospitals report heat-related illnesses.\nHeatstroke cases rising.' },
    { time: '3:00 PM', situation: 'Government opens cooling centers.\nLocations: Central Delhi, North Delhi.' },
  ]
};

const staticInfo = {
  Mumbai: 'Mumbai is experiencing a heavy downpour leading to street flooding, causing severe disruption in the city. Emergency services are on high alert, and residents are advised to evacuate from high-risk areas.',
  Delhi: 'Delhi is facing an intense heatwave with temperatures soaring above 42°C. Citizens are advised to avoid outdoor activities during the peak heat hours. Government has opened cooling centers for relief.'
};

const DisasterReport = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (activeLocation) {
      const timer = setInterval(() => {
        setActiveIndex((prevIndex) => {
          if (prevIndex < 4) {
            return prevIndex + 1;
          } else {
            return -1; // Reset to restart the animation
          }
        });
      }, 1000); // 1 second for the next node

      return () => clearInterval(timer);
    }
  }, [activeLocation]);

  const handleLocationClick = (location) => {
    setActiveLocation(location);
    setActiveIndex(-1);
    setTimeout(() => setActiveIndex(0), 100); // Start after a slight delay
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Time Series Analysis</h1>
      
      <div className="flex justify-center space-x-8 mb-12">
        {Object.keys(disasterData).map((location) => (
          <div 
            key={location}
            className={`relative w-48 h-48 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 transform hover:scale-105 ${
              activeLocation === location ? 'bg-red-200 scale-110 shadow-lg' : 'bg-indigo-100 hover:bg-indigo-200'
            }`}
            onClick={() => handleLocationClick(location)}
          >
            {location === 'Mumbai' ? (
              <Waves className="w-24 h-24 text-blue-500 animate-pulse" />
            ) : (
              <Thermometer className="w-24 h-24 text-red-500 animate-pulse" />
            )}
            <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full shadow text-lg font-semibold">
              {location}
            </div>
          </div>
        ))}
      </div>
      
      {activeLocation && (
        <div className="relative mt-24">
          {/* Progress bar */}
          <div className="h-1 bg-indigo-200 absolute top-16 left-0 transition-all duration-1000 ease-out"
               style={{width: `${(activeIndex + 1) / 5 * 100}%`}}></div>

          {/* Disaster timeline */}
          <div className="flex justify-between relative mb-8">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="relative">
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold
                                  transition-all duration-500 ${
                                    index <= activeIndex ? 'opacity-100' : 'opacity-0'
                                  }`}>
                  {disasterData[activeLocation][index].time}
                </div>
                <div 
                  className={`w-12 h-12 rounded-full ${
                    index <= activeIndex ? 'bg-green-500' : 'bg-gray-300'
                  } flex items-center justify-center transition-all duration-500 ease-in-out ${
                    index === activeIndex ? 'scale-125 shadow-lg' : ''
                  }`}
                >
                  <AlertCircle className={`w-6 h-6 text-white ${index === activeIndex ? 'animate-ping' : ''}`} />
                </div>
                <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-md text-sm w-64 transition-all duration-500 ${
                  index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                  <div className="font-semibold text-gray-700 leading-relaxed">
                    {disasterData[activeLocation][index].situation.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

         
          
        </div>
      )}
    </div>
  );
};

export default DisasterReport;