import React from 'react';

const Header = () => {
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Archive', href: '#' },
    { label: 'Time Series Analysis', href: '#' },
    { label: 'Predictions', href: '#' },
    { label: 'admin', href: '#' }
  ];

  return (
    <header className="bg-gray-900 text-white py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider">
          U.M.E.E.D
        </div>
        
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
export default Header;