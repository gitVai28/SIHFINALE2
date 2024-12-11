import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import data from "../collaspe.json";

const Report = () => {
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDisaster, setFilterDisaster] = useState("");
  const [locations, setLocations] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [tableData, setTableData] = useState(data);

  // Extract unique locations and disaster types for dropdown options
  useEffect(() => {
    const uniqueLocations = [
      ...new Set(
        data
          .map((item) => item.location?.trim())
          .filter((location) => location) // Exclude undefined or null values
      ),
    ];
    const uniqueDisasters = [
      ...new Set(
        data
          .map((item) => item.disaster_type?.trim())
          .filter((disaster) => disaster) // Exclude undefined or null values
      ),
    ];

    setLocations(uniqueLocations);
    setDisasters(uniqueDisasters);
    setTableData(data);
  }, []);

  // Automatically filter table data based on dropdown selections
  useEffect(() => {
    const filteredData = data
      .filter((item) =>
        filterLocation
          ? item.location?.toLowerCase() === filterLocation.toLowerCase()
          : true
      )
      .filter((item) =>
        filterDisaster
          ? item.disaster_type?.toLowerCase() === filterDisaster.toLowerCase()
          : true
      );

    setTableData(filteredData);
  }, [filterLocation, filterDisaster]);

  const handleDownload = () => {
    const filteredData = tableData;

    if (filteredData.length === 0) {
      alert("No data matches the filters.");
      return;
    }

    const csvHeader =
      "Date,Time,Content,Translated Content,Disaster Type,Location,Summary,URL,Likes,Retweets\n";
    const csvBody = filteredData
      .map(
        (item) =>
          `"${item.date || ""}","${item.time || ""}","${item.content || ""}","${
            item.translated_content || ""
          }","${item.disaster_type || ""}","${item.location || ""}","${
            item.summary || ""
          }","${item.url || ""}","${item.likes || ""}","${item.retweets || ""}"`
      )
      .join("\n");

    const csvContent = csvHeader + csvBody;

    // Save CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "report.csv");
  };

  const handlePrint = () => {
    const filterInfo = `
      <div style="font-size: 16px; margin-bottom: 20px;">
        
        Location: ${filterLocation || "All Locations"}<br />
        Disaster Type: ${filterDisaster || "All Disaster Types"}
      </div>
    `;
    const printContent = document.getElementById("printableTable").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = filterInfo + printContent; // Add filter info before table
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore original state
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Disaster Report
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Filter by Location:
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Filter by Disaster Type:
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={filterDisaster}
              onChange={(e) => setFilterDisaster(e.target.value)}
            >
              <option value="">All Disaster Types</option>
              {disasters.map((disaster, index) => (
                <option key={index} value={disaster}>
                  {disaster}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handlePrint}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Print Table
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Download CSV
          </button>
        </div>
      </div>

      <div id="printableTable">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Date</th>
              <th className="border border-black px-4 py-2">Time</th>
              <th className="border border-black px-4 py-2">Content</th>
              <th className="border border-black px-4 py-2">Translated Content</th>
              <th className="border border-black px-4 py-2">Disaster Type</th>
              <th className="border border-black px-4 py-2">Location</th>
              <th className="border border-black px-4 py-2">Summary</th>
              <th className="border border-black px-4 py-2">URL</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{item.date}</td>
                <td className="border border-black px-4 py-2">{item.time}</td>
                <td className="border border-black px-4 py-2">{item.content}</td>
                <td className="border border-black px-4 py-2">{item.translated_content}</td>
                <td className="border border-black px-4 py-2">{item.disaster_type}</td>
                <td className="border border-black px-4 py-2">{item.location}</td>
                <td className="border border-black px-4 py-2">{item.summary}</td>
                <td className="border border-black px-4 py-2">{item.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
