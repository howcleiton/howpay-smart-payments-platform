import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/logos/howpay-logo.png" 
                alt="Howpay Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-black">Howpay</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#produtos" className="text-gray-600 hover:text-black transition-colors">Produtos</a>
            <a href="#planos" className="text-gray-600 hover:text-black transition-colors">Planos</a>
            <a href="#como-funciona" className="text-gray-600 hover:text-black transition-colors">Como funciona</a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Criar conta</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
