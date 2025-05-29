import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, subDays, subHours } from 'date-fns';

type Charge = {
  amount: number;
  created_at: string;
};

const RevenueChart = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [range, setRange] = useState<'30d' | '7d' | '24h' | 'custom'>('30d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) return;

      let start: Date = new Date();
      let end: Date = new Date();

      if (range === '30d') start = subDays(new Date(), 29);
      else if (range === '7d') start = subDays(new Date(), 6);
      else if (range === '24h') start = subHours(new Date(), 23);
      else if (range === 'custom') {
        if (!customStart || !customEnd) return;
        start = new Date(customStart);
        end = new Date(customEnd);
      }

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      const { data: charges, error } = await supabase
        .from('charges')
        .select('amount, created_at')
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (error || !charges) {
        console.error(error);
        return;
      }

      const totals: { [key: string]: number } = {};
      const interval = range === '24h'
        ? 24
        : Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      for (let i = 0; i <= interval; i++) {
        const date = new Date(start);
        if (range === '24h') {
          date.setHours(start.getHours() + i);
          const label = format(date, 'HH:00');
          totals[label] = 0;
        } else {
          date.setDate(start.getDate() + i);
          const label = format(date, 'MM-dd');
          totals[label] = 0;
        }
      }

      charges.forEach(charge => {
        const date = new Date(charge.created_at);
        const label = range === '24h' ? format(date, 'HH:00') : format(date, 'MM-dd');
        if (totals[label] !== undefined) {
          totals[label] += charge.amount;
        }
      });

      const finalData = Object.entries(totals).map(([name, value]) => ({ name, value }));
      setData(finalData);
    };

    fetchData();
  }, [range, customStart, customEnd]);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Receita dos últimos {range === 'custom' ? 'período personalizado' : range}
        </h3>
        <div className="flex gap-2">
          <button className={`px-2 py-1 rounded ${range === '30d' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setRange('30d')}>30d</button>
          <button className={`px-2 py-1 rounded ${range === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setRange('7d')}>7d</button>
          <button className={`px-2 py-1 rounded ${range === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setRange('24h')}>24h</button>
          <button className={`px-2 py-1 rounded ${range === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setRange('custom')}>Personalizado</button>
        </div>
      </div>

      {range === 'custom' && (
        <div className="flex gap-4 mb-4">
          <div>
            <label className="text-sm">Início</label>
            <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="text-sm">Fim</label>
            <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="border px-2 py-1 rounded" />
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `R$ ${v}`} />
          <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;
