
import React from 'react';
import { Button } from '@/components/ui/button';

interface ChargesListProps {
  searchTerm: string;
}

const ChargesList: React.FC<ChargesListProps> = ({ searchTerm }) => {
  const charges = [
    {
      id: '001',
      customer: 'Maria Silva',
      email: 'maria@email.com',
      amount: 299.00,
      status: 'paid',
      method: 'pix',
      createdAt: '2024-01-15',
      dueDate: '2024-01-20'
    },
    {
      id: '002',
      customer: 'João Santos',
      email: 'joao@email.com',
      amount: 150.00,
      status: 'pending',
      method: 'boleto',
      createdAt: '2024-01-14',
      dueDate: '2024-01-21'
    },
    {
      id: '003',
      customer: 'Ana Costa',
      email: 'ana@email.com',
      amount: 89.90,
      status: 'paid',
      method: 'cartao',
      createdAt: '2024-01-13',
      dueDate: '2024-01-18'
    },
    {
      id: '004',
      customer: 'Pedro Lima',
      email: 'pedro@email.com',
      amount: 199.00,
      status: 'failed',
      method: 'cartao',
      createdAt: '2024-01-12',
      dueDate: '2024-01-17'
    },
    {
      id: '005',
      customer: 'Carla Mendes',
      email: 'carla@email.com',
      amount: 450.00,
      status: 'pending',
      method: 'pix',
      createdAt: '2024-01-11',
      dueDate: '2024-01-16'
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

  const getMethodText = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'boleto':
        return 'Boleto';
      case 'cartao':
        return 'Cartão';
      default:
        return 'Outro';
    }
  };

  const filteredCharges = charges.filter(charge =>
    charge.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charge.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charge.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Valor</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Método</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Vencimento</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCharges.map((charge) => (
            <tr key={charge.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-900">{charge.customer}</p>
                  <p className="text-sm text-gray-600">{charge.email}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="font-semibold text-gray-900">
                  R$ {charge.amount.toFixed(2).replace('.', ',')}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(charge.status)}`}>
                  {getStatusText(charge.status)}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm font-medium text-gray-700">
                  {getMethodText(charge.method)}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-gray-600">
                  {new Date(charge.dueDate).toLocaleDateString('pt-BR')}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                  <Button variant="outline" size="sm">
                    Reenviar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChargesList;
