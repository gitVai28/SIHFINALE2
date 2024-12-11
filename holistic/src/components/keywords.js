import React, { useState, useEffect } from "react";
import { AlertCircle, Check, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DisasterKeywordsManagement = () => {
  const navigate = useNavigate(); 
  const [disasterType, setDisasterType] = useState("");
  const [priority, setPriority] = useState("Low");
  const [keywords, setKeywords] = useState("");
  const [status, setStatus] = useState(null);
  const [allKeywords, setAllKeywords] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchKeywords = async () => {
    try {
      const response = await fetch("http://localhost:5000/keywords");
      if (response.ok) {
        const data = await response.json();
        setAllKeywords(data);
      } else {
        setStatus({
          type: "error",
          message: "Failed to fetch keywords.",
        });
      }
    } catch (error) {
      console.error("Error fetching keywords:", error);
      setStatus({
        type: "error",
        message: "An error occurred while fetching keywords.",
      });
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/keywords/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disasterType,
          priority: priority.toLowerCase(),
          keywords,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus({
          type: "success",
          message: result.message || "Keywords updated successfully!",
        });
        setDisasterType("");
        setPriority("Low");
        setKeywords("");
        setIsEditing(false);
        fetchKeywords(); // Refresh the list
      } else {
        const errorData = await response.json();
        setStatus({
          type: "error",
          message: errorData.error || "Failed to update keywords.",
        });
      }
    } catch (error) {
      console.error("Error updating keywords:", error);
      setStatus({
        type: "error",
        message: "An error occurred while updating keywords.",
      });
    }
  };

  const handleDelete = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/keywords/${type}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        setStatus({
          type: "success",
          message: result.message || "Keyword deleted successfully!",
        });
        fetchKeywords(); // Refresh the list
      } else {
        const errorData = await response.json();
        setStatus({
          type: "error",
          message: errorData.error || "Failed to delete keyword.",
        });
      }
    } catch (error) {
      console.error("Error deleting keyword:", error);
      setStatus({
        type: "error",
        message: "An error occurred while deleting keyword.",
      });
    }
  };

  const handleEdit = (type, data) => {
    setIsEditing(true);
    setDisasterType(type);
    setPriority(data.priority.charAt(0).toUpperCase() + data.priority.slice(1));
    setKeywords(data.keywords.join(", "));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-[90%] h-[90%] bg-white shadow-md rounded-lg p-8 flex">
        {/* Alert Button */}
        <button
          className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/admin/alerts")} // Redirect to /admin/alerts
        >
          Alert
        </button>

        {/* Left Column: Display Keywords */}
        <div className="w-1/2 pr-4 border-r border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Keywords</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Disaster Type</th>
                <th className="border border-gray-300 px-4 py-2">Priority</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(allKeywords).map(([type, data]) => (
                <tr key={type}>
                  <td className="border border-gray-300 px-4 py-2">{type}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.priority}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => handleEdit(type, data)}
                    >
                      <Edit2 className="inline-block w-5 h-5" /> Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(type)}
                    >
                      <Trash2 className="inline-block w-5 h-5" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column: Add/Update Keywords */}
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {isEditing ? "Edit Keyword" : "Add Keyword"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Disaster Type
              </label>
              <input
                type="text"
                value={disasterType}
                onChange={(e) => setDisasterType(e.target.value)}
                required
                disabled={isEditing}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="Enter disaster type"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter keywords, separated by commas"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isEditing ? "Update Keywords" : "Add Keywords"}
            </button>

            {status && (
              <div
                className={`mt-4 p-3 rounded-md flex items-center ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.type === "success" ? (
                  <Check className="mr-2" />
                ) : (
                  <AlertCircle className="mr-2" />
                )}
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DisasterKeywordsManagement;
