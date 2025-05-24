
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Subscriptions = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assinaturas</h1>
          <p className="text-gray-600">Gerencie pagamentos recorrentes</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600 text-white">
          + Nova Assinatura
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Assinaturas Ativas</h3>
          <p className="text-3xl font-bold text-success">12</p>
          <p className="text-sm text-gray-600 mt-1">+2 este mês</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Receita Recorrente</h3>
          <p className="text-3xl font-bold text-gray-900">R$ 2.400</p>
          <p className="text-sm text-gray-600 mt-1">Por mês</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Taxa de Retenção</h3>
          <p className="text-3xl font-bold text-primary">96%</p>
          <p className="text-sm text-gray-600 mt-1">Últimos 6 meses</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Cobranças</h3>
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma cobrança recorrente configurada ainda</p>
          <Button className="mt-4 bg-primary hover:bg-primary-600 text-white">
            Criar primeira assinatura
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Subscriptions;
