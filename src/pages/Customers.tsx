
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Customers = () => {
  const customers = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      document: '123.456.789-00',
      totalCharges: 5,
      totalAmount: 1450.00,
      lastCharge: '2024-01-15'
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      document: '987.654.321-00',
      totalCharges: 3,
      totalAmount: 850.00,
      lastCharge: '2024-01-14'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie seus clientes</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600 text-white">
          + Novo Cliente
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Buscar clientes..."
            className="w-80"
          />
          <div className="text-sm text-gray-600">
            {customers.length} clientes
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Documento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total de Cobranças</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Valor Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Última Cobrança</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{customer.document}</td>
                  <td className="py-4 px-4 text-gray-700">{customer.totalCharges}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    R$ {customer.totalAmount.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(customer.lastCharge).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Ver</Button>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Customers;
