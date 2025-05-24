
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-600">Gerencie seus pagamentos e cobranças</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="relative border-primary-200 hover:bg-primary-50">
            🔔
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-howpay-gradient rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">João Silva</div>
              <div className="text-xs text-gray-500">joao@empresa.com</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
