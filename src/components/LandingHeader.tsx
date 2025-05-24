
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
                src="/lovable-uploads/85e36274-7be9-41a3-bc7a-de6b6cc20c41.png" 
                alt="Howpay Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-black">Howpay</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#produtos" className="text-gray-600 hover:text-black transition-colors">Produtos</a>
            <a href="#solucoes" className="text-gray-600 hover:text-black transition-colors">Soluções</a>
            <a href="#desenvolvedores" className="text-gray-600 hover:text-black transition-colors">Desenvolvedores</a>
            <a href="#precos" className="text-gray-600 hover:text-black transition-colors">Preços</a>
            <a href="#recursos" className="text-gray-600 hover:text-black transition-colors">Recursos</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-black">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white shadow-lg">
                Criar conta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
