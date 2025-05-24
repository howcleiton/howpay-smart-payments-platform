
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecentCharges = () => {
  const charges = [
    {
      id: '1',
      customer: 'Maria Silva',
      amount: 'R$ 299,00',
      status: 'paid',
      method: 'pix',
      date: '2h atrás'
    },
    {
      id: '2',
      customer: 'João Santos',
      amount: 'R$ 150,00',
      status: 'pending',
      method: 'boleto',
      date: '5h atrás'
    },
    {
      id: '3',
      customer: 'Ana Costa',
      amount: 'R$ 89,90',
      status: 'paid',
      method: 'cartao',
      date: '1d atrás'
    },
    {
      id: '4',
      customer: 'Pedro Lima',
      amount: 'R$ 199,00',
      status: 'failed',
      method: 'cartao',
      date: '2d atrás'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-warning text-white';
      case 'failed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'pix':
        return '📱';
      case 'boleto':
        return '📄';
      case 'cartao':
        return '💳';
      default:
        return '💰';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Últimas Cobranças</h3>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </div>
      
      <div className="space-y-4">
        {charges.map((charge) => (
          <div key={charge.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getMethodIcon(charge.method)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{charge.customer}</p>
                <p className="text-sm text-gray-600">{charge.date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">{charge.amount}</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(charge.status)}`}>
                {getStatusText(charge.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentCharges;
