import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/charges', label: 'Cobranças', icon: '🧾' },
    { path: '/customers', label: 'Clientes', icon: '👥' },
    { path: '/subscriptions', label: 'Assinaturas', icon: '📅' },
    { path: '/reports', label: 'Relatórios', icon: '📈' },
    { path: '/settings', label: 'Configurações', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/logos/howpay-logo.png" 
              alt="Howpay Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-xl font-bold text-black">Howpay</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded transition ${
              location.pathname === item.path
                ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
