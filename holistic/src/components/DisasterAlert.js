import React, { useState } from 'react';
import data from '../collaspe.json';

// Utility function to capitalize the first letter
const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Filter data to include only the past 7 days
const filterPast7Days = (data) => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  return data.filter((item) => {
    const itemDate = new Date(item.date); // Ensure date is in a parsable format
    return itemDate >= sevenDaysAgo && itemDate <= currentDate;
  });
};

const DisasterTypeCard = ({ disasterType, isSelected, onCardClick }) => {
  return (
    <div
      className={`bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 shadow-md rounded-lg p-6 cursor-pointer transform transition duration-300 hover:scale-105 ${
        isSelected ? 'ring-4 ring-offset-2 ring-blue-400' : ''
      }`}
      onClick={() => onCardClick(disasterType)}
    >
      <h2 className="text-2xl font-semibold text-center">{capitalize(disasterType)}</h2>
    </div>
  );
};

const DisasterDetails = ({ disasterType, items }) => {
  return (
    <div
      className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg rounded-lg p-8 transition duration-300 transform hover:scale-105"
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center underline">
        {capitalize(disasterType)} Details
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <p className="font-medium text-gray-700">
              <span className="font-bold">Location:</span> {item.location}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Summary:</span> {item.summary}
            </p>
            
            <p className="text-gray-600">
              <span className="font-bold">Date:</span> {item.date}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Time:</span> {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DisasterAlert = () => {
  const [selectedDisasterType, setSelectedDisasterType] = useState(null);

  // Filter data for the past 7 days
  const filteredData = filterPast7Days(data);

  // Remove duplicate disasters by using a Set
  const uniqueData = Array.from(
    new Set(filteredData.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  // Group data by unique disaster types
  const groupedData = uniqueData.reduce((acc, item) => {
    if (!acc[item.disaster_type]) {
      acc[item.disaster_type] = [];
    }
    acc[item.disaster_type].push(item);
    return acc;
  }, {});

  const uniqueDisasterTypes = Object.keys(groupedData);

  const handleCardClick = (disasterType) => {
    setSelectedDisasterType((prevType) =>
      prevType === disasterType ? null : disasterType
    ); // Toggle details on re-click
  };

  return (
    <div className="w-1/2 mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {uniqueDisasterTypes.map((disasterType) => (
          <DisasterTypeCard
            key={disasterType}
            disasterType={disasterType}
            isSelected={selectedDisasterType === disasterType}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      {selectedDisasterType && (
        <DisasterDetails
          disasterType={selectedDisasterType}
          items={groupedData[selectedDisasterType]}
        />
      )}
    </div>
  );
};

export default DisasterAlert;
