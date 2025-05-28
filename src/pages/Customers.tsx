import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Customers = () => {
  const [customers, setCustomers] = useState([
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
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', document: '' });

  const openEditModal = (customer: any) => {
    setCurrentCustomer(customer);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    setCustomers(prev =>
      prev.map(c => c.id === currentCustomer.id ? currentCustomer : c)
    );
    setEditModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const handleCreate = () => {
    const id = (Math.random() * 100000).toFixed(0);
    const newEntry = {
      ...newCustomer,
      id,
      totalCharges: 0,
      totalAmount: 0,
      lastCharge: '-'
    };
    setCustomers(prev => [...prev, newEntry]);
    setNewCustomer({ name: '', email: '', document: '' });
    setCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie seus clientes</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-600 text-white"
          onClick={() => setCreateModalOpen(true)}
        >
          + Novo Cliente
        </Button>
      </div>

      <Input placeholder="Buscar clientes..." className="w-full max-w-md" />

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse mt-4">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Cliente</th>
              <th className="p-2">Documento</th>
              <th className="p-2">Total de Cobranças</th>
              <th className="p-2">Valor Total</th>
              <th className="p-2">Última Cobrança</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.name}<br /><small>{c.email}</small></td>
                <td className="p-2">{c.document}</td>
                <td className="p-2">{c.totalCharges}</td>
                <td className="p-2">R$ {c.totalAmount.toFixed(2)}</td>
                <td className="p-2">{c.lastCharge}</td>
                <td className="p-2 flex gap-2">
                  <Button onClick={() => openEditModal(c)}>Editar</Button>
                  <Button variant="destructive" onClick={() => handleDelete(c.id)}>X</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Editar */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          {currentCustomer && (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <Label>Nome</Label>
              <Input
                value={currentCustomer.name}
                onChange={(e) =>
                  setCurrentCustomer({ ...currentCustomer, name: e.target.value })
                }
              />
              <Label>Email</Label>
              <Input
                value={currentCustomer.email}
                onChange={(e) =>
                  setCurrentCustomer({ ...currentCustomer, email: e.target.value })
                }
              />
              <Label>Documento</Label>
              <Input
                value={currentCustomer.document}
                onChange={(e) =>
                  setCurrentCustomer({ ...currentCustomer, document: e.target.value })
                }
              />
              <Button type="submit" className="mt-4">
                Salvar
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Criar */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <Label>Nome Completo ou Empresa</Label>
            <Input
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
            />
            <Label>Email</Label>
            <Input
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />
            <Label>CPF ou CNPJ</Label>
            <Input
              value={newCustomer.document}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, document: e.target.value })
              }
            />
            <Button type="submit" className="mt-4">
              Salvar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
