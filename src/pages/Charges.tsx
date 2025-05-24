
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChargesList from '@/components/ChargesList';
import CreateChargeModal from '@/components/CreateChargeModal';

const Charges = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">Cobranças</h1>
          <p className="text-gray-600">Gerencie todas as suas cobranças</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white shadow-lg"
        >
          + Nova Cobrança
        </Button>
      </div>

      <Card className="p-6 border-2 border-gradient-to-r from-primary-100 to-secondary-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Buscar por cliente, valor ou status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 border-primary-200 focus:border-primary-500"
            />
            <Button variant="outline" className="border-primary-300 text-primary-600 hover:bg-primary-50">
              Filtrar
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            147 cobranças encontradas
          </div>
        </div>

        <ChargesList searchTerm={searchTerm} />
      </Card>

      <CreateChargeModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Charges;
