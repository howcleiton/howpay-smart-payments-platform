import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

const RevenueChart = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) return;

      const today = new Date();
      const start = new Date();
      start.setDate(today.getDate() - 29);
      start.setHours(0, 0, 0, 0);

      const { data: charges, error } = await supabase
        .from('charges')
        .select('amount, created_at')
        .eq('user_id', userId)
        .eq('status', 'paid')
        .gte('created_at', start.toISOString());

      if (error || !charges) {
        console.error(error);
        return;
      }

      const dailyTotals: { [date: string]: number } = {};

      for (let i = 0; i < 30; i++) {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        const key = date.toISOString().split('T')[0];
        dailyTotals[key] = 0;
      }

      charges.forEach((charge) => {
        const date = new Date(charge.created_at).toISOString().split('T')[0];
        if (dailyTotals[date] !== undefined) {
          dailyTotals[date] += charge.amount;
        }
      });

      const finalData = Object.entries(dailyTotals).map(([date, total]) => ({
        name: date.slice(5), // mostra MM-DD
        value: total,
      }));

      setData(finalData);
    };

    fetchData();
  }, []);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Receita dos últimos 30 dias</h3>
          <p className="text-sm text-gray-600">Evolução dos pagamentos recebidos</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-white">
            30d
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-full text-gray-600 hover:bg-gray-100">
            7d
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
            />
            <Tooltip
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Receita']}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2363eb"
              strokeWidth={3}
              dot={{ fill: '#2363eb', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#2363eb', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
