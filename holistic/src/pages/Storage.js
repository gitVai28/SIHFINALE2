import React, { useEffect, useState } from "react";
import axios from "axios";

const Storage = () => {
  const [data, setData] = useState([]); // Holds fetched data
  const [error, setError] = useState(""); // Holds error message, if any
  const [loading, setLoading] = useState(true); // Tracks loading state

  useEffect(() => {
    // Azure Blob Storage JSON file URL
    const jsonUrl = "https://umeed.blob.core.windows.net/disaster-data/combined_sorted_data.json";

    // Fetch data from the Azure Blob URL
    axios
      .get(jsonUrl)
      .then((response) => {
        console.log("Fetched data:", response.data); // Debug: Log fetched data
        setData(response.data); // Update state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        console.error("Error fetching JSON data:", err.response || err.message || err);
        setError(`Failed to load data: ${err.response?.statusText || err.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Disaster Report</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{item.title}</h3>
              <p>
                <strong>Source:</strong> {item.source}
              </p>
              <p>
                <strong>Date:</strong> {item.date} | <strong>Time:</strong> {item.time}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Disaster Type:</strong> {item.disaster_type}
              </p>
              <p>
                <strong>Summary:</strong> {item.summary}
              </p>
              <p>
                <strong>Publisher:</strong> {item.publisher}
              </p>
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt="Thumbnail"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
              )}
              <p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#007BFF",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Read more
                </a>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available.</p> // Show message if no data is returned
      )}
    </div>
  );
};

export default Storage;
