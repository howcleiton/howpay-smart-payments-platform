import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const DashboardStats = () => {
  const [stats, setStats] = useState([
    { title: 'Receita Total', value: 'R$ 0,00', change: '–', changeType: 'neutral', icon: '💰' },
    { title: 'Cobranças Pagas', value: '0', change: '–', changeType: 'neutral', icon: '✅' },
    { title: 'Pendentes', value: '0', change: '–', changeType: 'neutral', icon: '⏳' },
    { title: 'Taxa de Conversão', value: '0%', change: '–', changeType: 'neutral', icon: '📈' },
  ]);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercent = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const diff = ((current - previous) / previous) * 100;
    return `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`;
  };

  useEffect(() => {
    const loadStats = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) return;

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString();

      // Cobranças pagas (valor)
      const { data: paidCharges } = await supabase
        .from('charges')
        .select('amount')
        .eq('user_id', userId)
        .eq('status', 'paid');

      const totalRevenue = paidCharges?.reduce((sum, c) => sum + c.amount, 0) ?? 0;

      // Contagens
      const [{ count: paid }, { count: paidOld }, { count: pending }, { count: pendingOld }] =
        await Promise.all([
          supabase
            .from('charges')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('status', 'paid')
            .gte('created_at', startOfMonth),

          supabase
            .from('charges')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('status', 'paid')
            .gte('created_at', startOfLastMonth)
            .lte('created_at', endOfLastMonth),

          supabase
            .from('charges')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('status', 'pending')
            .gte('created_at', startOfMonth),

          supabase
            .from('charges')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('status', 'pending')
            .gte('created_at', startOfLastMonth)
            .lte('created_at', endOfLastMonth),
        ]);

      const total = (paid ?? 0) + (pending ?? 0);
      const conversion = total > 0 ? ((paid ?? 0) / total) * 100 : 0;

      setStats([
        {
          title: 'Receita Total',
          value: formatCurrency(totalRevenue),
          change: '–',
          changeType: 'neutral',
          icon: '💰',
        },
        {
          title: 'Cobranças Pagas',
          value: `${paid ?? 0}`,
          change: formatPercent(paid ?? 0, paidOld ?? 0),
          changeType: (paid ?? 0) > (paidOld ?? 0) ? 'positive' : (paid ?? 0) < (paidOld ?? 0) ? 'negative' : 'neutral',
          icon: '✅',
        },
        {
          title: 'Pendentes',
          value: `${pending ?? 0}`,
          change: formatPercent(pending ?? 0, pendingOld ?? 0),
          changeType: (pending ?? 0) > (pendingOld ?? 0)
            ? 'negative'
            : (pending ?? 0) < (pendingOld ?? 0)
            ? 'positive'
            : 'neutral',
          icon: '⏳',
        },
        {
          title: 'Taxa de Conversão',
          value: `${conversion.toFixed(1)}%`,
          change: '–',
          changeType: 'neutral',
          icon: '📈',
        },
      ]);
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p
                className={`text-sm mt-2 flex items-center ${
                  stat.changeType === 'positive'
                    ? 'text-success'
                    : stat.changeType === 'negative'
                    ? 'text-red-500'
                    : 'text-gray-400'
                }`}
              >
                {stat.changeType === 'positive' && <span className="mr-1">↗️</span>}
                {stat.changeType === 'negative' && <span className="mr-1">↘️</span>}
                {stat.changeType === 'neutral' && <span className="mr-1">–</span>}
                {stat.change !== '–' ? `${stat.change} vs mês passado` : 'Sem dados ainda'}
              </p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
