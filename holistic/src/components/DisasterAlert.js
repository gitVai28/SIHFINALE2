import React, { useState } from 'react';
import data from '../collaspe.json';

const DisasterTypeCard = ({ disasterType, items, onCardClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100"
      onClick={() => onCardClick(disasterType)}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{disasterType}</h2>
    </div>
  );
};

const DisasterDetails = ({ disasterType, items }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{disasterType}</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-3">
            <p className="font-medium text-gray-700">{item.location}</p>
            <p className="text-gray-600">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [selectedDisasterType, setSelectedDisasterType] = useState(null);

  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.disaster_type]) {
      acc[item.disaster_type] = [];
    }
    acc[item.disaster_type].push(item);
    return acc;
  }, {});

  const handleCardClick = (disasterType) => {
    setSelectedDisasterType(disasterType);
  };

  return (
    <div className="flex justify-end w-full">
      <div className="w-1/2 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {Object.keys(groupedData).map((disasterType) => (
            <DisasterTypeCard
              key={disasterType}
              disasterType={disasterType}
              items={groupedData[disasterType]}
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
    </div>
  );
};

export default App;