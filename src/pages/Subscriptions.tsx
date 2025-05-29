import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO, subMonths } from 'date-fns';

type Subscription = {
  id: string;
  customer_name: string;
  amount: number;
  status: string;
  start_date: string;
};

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) return;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id);

    if (!error && data) {
      setSubscriptions(data as Subscription[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) return <p className="p-6">Carregando...</p>;

  const activeSubs = subscriptions.filter((s) => s.status === 'active');
  const recurringRevenue = activeSubs.reduce((sum, s) => sum + s.amount, 0);

  // Assinaturas nos últimos 6 meses
  const sixMonthsAgo = subMonths(new Date(), 6);
  const recentSubs = subscriptions.filter((s) => new Date(s.start_date) >= sixMonthsAgo);
  const recentActives = recentSubs.filter((s) => s.status === 'active');
  const retentionRate = recentSubs.length > 0
    ? Math.round((recentActives.length / recentSubs.length) * 100)
    : 0;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Assinaturas</h1>
      <p className="text-gray-600">Gerencie pagamentos recorrentes</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Assinaturas Ativas</p>
          <p className="text-2xl font-semibold text-green-600">{activeSubs.length}</p>
          <p className="text-xs text-gray-400 mt-1">
            +{activeSubs.length - 1} este mês
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Receita Recorrente</p>
          <p className="text-2xl font-semibold">R$ {recurringRevenue.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">Por mês</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Taxa de Retenção</p>
          <p className="text-2xl font-semibold text-orange-600">{retentionRate}%</p>
          <p className="text-xs text-gray-400 mt-1">Últimos 6 meses</p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Próximas Cobranças</h2>
        {activeSubs.length === 0 ? (
          <div className="text-center text-gray-500">
            Nenhuma cobrança recorrente configurada ainda
            <div className="mt-4">
              <Button>+ Criar primeira assinatura</Button>
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {activeSubs.map((sub) => (
              <li key={sub.id} className="border p-4 rounded shadow-sm bg-white">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{sub.customer_name}</p>
                    <p className="text-sm text-gray-500">Valor: R$ {sub.amount.toFixed(2)}</p>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    Próxima: {format(parseISO(sub.start_date), 'dd/MM/yyyy')}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
