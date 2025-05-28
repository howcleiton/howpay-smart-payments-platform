import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type Customer = {
  id: string;
  name: string;
  email: string;
  document: string;
  created_at: string;
};

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', document: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Erro ao carregar clientes:', error);
    else setCustomers(data as Customer[]);

    setLoading(false);
  };

  const handleCreate = async () => {
    const { data, error } = await supabase.from('customers').insert([
      {
        name: newCustomer.name,
        email: newCustomer.email,
        document: newCustomer.document,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ]);

    if (error) return alert('Erro ao criar cliente: ' + error.message);
    setCreateModalOpen(false);
    setNewCustomer({ name: '', email: '', document: '' });
    fetchCustomers();
  };

  const openEditModal = (customer: Customer) => {
    setCurrentCustomer(customer);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!currentCustomer) return;

    const { error } = await supabase
      .from('customers')
      .update({
        name: currentCustomer.name,
        email: currentCustomer.email,
        document: currentCustomer.document,
      })
      .eq('id', currentCustomer.id);

    if (error) return alert('Erro ao atualizar cliente: ' + error.message);
    setEditModalOpen(false);
    fetchCustomers();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) return alert('Erro ao excluir cliente: ' + error.message);
    fetchCustomers();
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

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse mt-4">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Cliente</th>
                <th className="p-2">Documento</th>
                <th className="p-2">Email</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.document}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2 flex gap-2">
                    <Button onClick={() => openEditModal(c)}>Editar</Button>
                    <Button variant="destructive" onClick={() => handleDelete(c.id)}>X</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Criar */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <Label>Nome Completo</Label>
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
    </div>
  );
};

export default Customers;
