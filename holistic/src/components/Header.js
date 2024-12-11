import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-gray-50 p-4 min-h-[72px] flex flex-col md:flex-row items-center justify-between font-sans w-full overflow-x-hidden">
      <div className="flex flex-col items-center justify-between w-full md:w-auto">
        <h1 className="text-3xl font-bold mb-1 md:mb-0" style={{ fontFamily: 'Georgia, serif' }}>U.M.E.E.D</h1>
      
        <button className="text-gray-50 md:hidden mt-2" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      <nav className={`flex-col md:flex-row md:flex gap-6 ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto`}>
        <Link to="/" className="hover:text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>Home</Link>
        <Link to="/archive" className="hover:text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>Archive</Link>
        <Link to="/time-series-analysis" className="hover:text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>Time Series Analysis</Link>
        {/* <Link to="/predictions" className="hover:text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>Predictions</Link> */}
        <Link to="/admin" className="hover:text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>admin</Link>
        <Link to="/report" className="hover:text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>Report</Link>
      </nav>
    </header>
  );
};

export default Header;
