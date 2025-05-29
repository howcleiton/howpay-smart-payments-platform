// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [charges, setCharges] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        setUserName(profile?.full_name || '');
      }
    };

    const fetchCharges = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (user) {
        const { data, error } = await supabase
          .from('charges')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error) setCharges(data || []);
      }
    };

    fetchUserName();
    fetchCharges();
  }, []);

  const paidCharges = charges.filter((c) => c.status === 'paid');
  const pendingCharges = charges.filter((c) => c.status === 'pending');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => navigate('/charges/create')}>+ Nova Cobrança</Button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Olá, {userName}</h2>
      <p className="mb-6 text-gray-500">Visão geral dos seus pagamentos</p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Receita Total</p>
          <p className="text-xl font-semibold">R$ {paidCharges.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Cobranças Pagas</p>
          <p className="text-xl font-semibold">{paidCharges.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-xl font-semibold">{pendingCharges.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Taxa de Conversão</p>
          <p className="text-xl font-semibold">
            {charges.length > 0 ? `${((paidCharges.length / charges.length) * 100).toFixed(1)}%` : '0%'}
          </p>
        </Card>
      </div>

      <Card className="p-4">
        <p className="text-md font-semibold mb-2">Últimas Cobranças</p>
        {charges.slice(0, 3).map((charge) => (
          <div key={charge.id} className="flex justify-between items-center border-b py-2 last:border-0">
            <div>
              <p className="font-medium">{charge.customer_name}</p>
              <p className="text-sm text-gray-500">
                {new Date(charge.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">R$ {charge.amount.toFixed(2)}</p>
              <p className={`text-sm ${charge.status === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                {charge.status === 'paid' ? 'Pago' : 'Pendente'}
              </p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Dashboard;
