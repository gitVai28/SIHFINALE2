import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sirenAudio from "./siren.mp3";

const Disaster = ({ onAcknowledge }) => {
  const navigate = useNavigate();

  const initialDisasterData = useMemo(
    () => [
        {
          "source": "Twitter",
          "date": "2024-12-11",
          "time": "10:45 AM",
          "content": "Magnitude 7.1 earthquake detected. Risk of significant damage in the northern and northeastern regions of India.",
          "translated_content": "Magnitude 7.1 earthquake detected. Risk of significant damage in the northern and northeastern regions of India.",
          "disaster_type": "earthquake",
          "location": "Himalayan Region, India",
          "summary": "Magnitude 7.1 earthquake detected. Risk of significant damage.",
          "username": "disaster_alerts",
          "likes": 120,
          "retweets": 45
        },
        {
          "source": "Twitter",
          "date": "2024-12-12",
          "time": "2:30 PM",
          "content": "Magnitude 6.4 earthquake felt across the northeastern region. Minimal structural damage reported.",
          "translated_content": "Magnitude 6.4 earthquake felt across the northeastern region. Minimal structural damage reported.",
          "disaster_type": "earthquake",
          "location": "North-East Region, India",
          "summary": "Magnitude 6.4 earthquake detected.",
          "username": "quake_watch",
          "likes": 98,
          "retweets": 30
        },
        {
          "source": "Twitter",
          "date": "2024-12-13",
          "time": "7:50 AM",
          "content": "Continuous rainfall has caused Brahmaputra River to overflow, affecting nearby villages.",
          "translated_content": "Continuous rainfall has caused Brahmaputra River to overflow, affecting nearby villages.",
          "disaster_type": "flood",
          "location": "Assam, India",
          "summary": "Brahmaputra River overflow impacting nearby villages.",
          "username": "flood_alerts",
          "likes": 150,
          "retweets": 60
        },
        {
          "source": "Twitter",
          "date": "2024-12-14",
          "time": "3:30 PM",
          "content": "Coastal areas in Tamil Nadu are on alert following seismic activity in the Indian Ocean.",
          "translated_content": "Coastal areas in Tamil Nadu are on alert following seismic activity in the Indian Ocean.",
          "disaster_type": "tsunami warning",
          "location": "Chennai, Tamil Nadu, India",
          "summary": "Coastal areas in Tamil Nadu are on high alert.",
          "username": "ocean_alerts",
          "likes": 180,
          "retweets": 75
        },
        {
          "source": "Twitter",
          "date": "2024-12-13",
          "time": "9:15 AM",
          "content": "Wildfire spreading across dry vegetation in Aravalli hills. Efforts underway to contain it.",
          "translated_content": "Wildfire spreading across dry vegetation in Aravalli hills. Efforts underway to contain it.",
          "disaster_type": "forest fire",
          "location": "Aravalli Hills, Rajasthan",
          "summary": "Wildfire in Aravalli hills being contained.",
          "username": "forest_guard",
          "likes": 110,
          "retweets": 40
        }
      ]
      ,
    []
  );

  const adminContact = "+919699408170";
  const emergencyContacts = ["+919699408170"];

  const [isDisaster, setIsDisaster] = useState(false);
  const [currentDisasterIndex, setCurrentDisasterIndex] = useState(0);
  const [disasterData, setDisasterData] = useState(null);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [smsStatus, setSmsStatus] = useState([]);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const simulateDisasters = () => {
      if (currentDisasterIndex < initialDisasterData.length) {
        setIsDisaster(true);
        setDisasterData(initialDisasterData[currentDisasterIndex]);
        sendSmsToAdmin(initialDisasterData[currentDisasterIndex]);
      }
    };

    const timer = setTimeout(simulateDisasters, 10000);

    return () => clearTimeout(timer);
  }, [currentDisasterIndex, initialDisasterData]);

  useEffect(() => {
    if (isDisaster && audioRef.current) {
      audioRef.current.play().catch(() => setAudioError(true));
    }
  }, [isDisaster]);

  const sendSmsToAdmin = async (data) => {
    try {
      await axios.post("https://sih-backend-1.onrender.com/sms/send", {
        phoneNumber: adminContact,
        message: `ALERT: ${data.type} in ${data.location}. ${data.summary}`,
      });
    } catch (error) {
      console.error("Error sending SMS to admin:", error);
    }
  };

  const sendSmsToContacts = async () => {
    if (!disasterData) return;

    const results = [];
    for (const number of emergencyContacts) {
      try {
        const response = await axios.post(
          "https://sih-backend-1.onrender.com/sms/send",
          {
            phoneNumber: number,
            message: `ALERT: ${disasterData.type} in ${disasterData.location}. ${disasterData.summary}`,
          }
        );

        results.push({
          phoneNumber: number,
          success: response.data.success,
          message: response.data.success ? "Sent successfully" : "Failed to send",
        });
      } catch (error) {
        results.push({
          phoneNumber: number,
          success: false,
          message: "Network error",
        });
      }
    }

    setSmsStatus(results);
  };

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    sendSmsToContacts();

    if (onAcknowledge) {
      onAcknowledge(disasterData);
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Move to next disaster or reset
    const nextIndex = currentDisasterIndex + 1;
    if (nextIndex < initialDisasterData.length) {
      setCurrentDisasterIndex(nextIndex);
      setIsDisaster(false);
      setDisasterData(null);
      setIsAcknowledged(false);
      setSmsStatus([]);
    }
  };

  const handleReset = () => {
    // Move to next disaster or reset
    const nextIndex = currentDisasterIndex + 1;
    if (nextIndex < initialDisasterData.length) {
      setCurrentDisasterIndex(nextIndex);
      setIsDisaster(false);
      setDisasterData(null);
      setIsAcknowledged(false);
      setSmsStatus([]);
    }
  };

  if (!isDisaster || !disasterData) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[30vh] overflow-auto">
      <div className="relative">
        {/* Ripple effect */}
        <div className="absolute -inset-4 bg-red-500 opacity-25 animate-ping-slow rounded-xl"></div>
        <div className="absolute -inset-2 bg-red-500 opacity-25 animate-ping-slow rounded-xl"></div>

        <div className="bg-white shadow-2xl rounded-xl border-t-4 border-red-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 animate-pulse"></div>
          
          <button
            onClick={() => navigate("/admin/keywords")}
            className="absolute top-2 right-2 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 z-10"
          >
            Add Keyword
          </button>

          <div className="p-4 relative z-10">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mr-3 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-red-600">
                {disasterData.type} Alert
              </h2>
            </div>
            
            <p className="text-gray-800 mb-1">
              <strong>Location:</strong> {disasterData.location}
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Severity:</strong> {disasterData.severity}
            </p>
            <p className="text-gray-600 italic mb-4">{disasterData.summary}</p>

            {isAcknowledged ? (
              <div className="mt-4 bg-green-50 p-3 rounded text-green-700 text-sm">
                <strong>Alert acknowledged. SMS sent to emergency contacts.</strong>
              </div>
            ) : (
              <div className="mt-4 flex justify-between gap-4">
                <button
                  onClick={handleAcknowledge}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                >
                  Acknowledge
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}

            {smsStatus.length > 0 && (
              <div className="mt-4 bg-gray-100 p-3 rounded">
                <h3 className="text-xs font-bold mb-2">SMS Status</h3>
                {smsStatus.map((status, idx) => (
                  <div
                    key={idx}
                    className={`text-xs ${status.success ? "text-green-600" : "text-red-600"}`}
                  >
                    {status.phoneNumber}: {status.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={sirenAudio} />
      {audioError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded text-sm shadow-lg">
          Could not play siren audio.
        </div>
      )}
    </div>
  );
};

export default Disaster;