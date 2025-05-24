
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
              src="/lovable-uploads/85e36274-7be9-41a3-bc7a-de6b6cc20c41.png" 
              alt="Howpay Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-xl font-bold text-black">Howpay</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-howpay-gradient text-white shadow-md'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-success-light to-secondary-100 rounded-lg p-3 border border-secondary-200">
          <div className="text-sm font-medium text-success-dark">Plano Premium</div>
          <div className="text-xs text-gray-600">Cobranças ilimitadas</div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
