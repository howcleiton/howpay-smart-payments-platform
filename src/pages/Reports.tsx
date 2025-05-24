
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e exportações</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600 text-white">
          Exportar Dados
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita por Método</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">PIX</span>
              <span className="font-medium">R$ 18.450 (65%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cartão</span>
              <span className="font-medium">R$ 8.200 (29%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Boleto</span>
              <span className="font-medium">R$ 1.580 (6%)</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Clientes</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Maria Silva</span>
              <span className="font-medium">R$ 2.450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">João Santos</span>
              <span className="font-medium">R$ 1.850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ana Costa</span>
              <span className="font-medium">R$ 1.200</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Exportar Relatórios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20">
            <div className="text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-sm">Vendas Mensais</div>
            </div>
          </Button>
          <Button variant="outline" className="h-20">
            <div className="text-center">
              <div className="text-2xl mb-1">👥</div>
              <div className="text-sm">Lista de Clientes</div>
            </div>
          </Button>
          <Button variant="outline" className="h-20">
            <div className="text-center">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-sm">Todas as Transações</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
