// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'
import Admin from './pages/admin'
import Time from './pages/DisasterReport'

function App() {
  return (
    <Router>
      <div className="relative w-full h-screen">
        {/* Global Header */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Header />
        </div>

        {/* Routes Container */}
        <div className="absolute top-[64px] left-0 w-full h-[calc(100%-64px)] overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/time-series-analysis" element={<Time/>}/>
              
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
