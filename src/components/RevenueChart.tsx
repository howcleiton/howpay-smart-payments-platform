import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO, subDays, subHours } from 'date-fns';

interface Charge {
  amount: number;
  created_at: string;
}

const RevenueChart = () => {
  const [range, setRange] = useState<'30d' | '7d' | '24h' | 'custom'>('30d');
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) return;

      let startDate: Date = new Date();
      let endDate: Date = new Date();

      if (range === '30d') {
        startDate = subDays(new Date(), 30);
      } else if (range === '7d') {
        startDate = subDays(new Date(), 7);
      } else if (range === '24h') {
        startDate = subHours(new Date(), 24);
      } else if (range === 'custom') {
        if (!customStart || !customEnd) return;
        startDate = new Date(customStart);
        endDate = new Date(customEnd);
      }

      const { data, error } = await supabase
        .from('charges')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (error) {
        console.error('Erro ao buscar dados:', error);
        return;
      }

      const grouped = data.reduce((acc: Record<string, number>, charge: Charge) => {
        const key = range === '24h'
          ? format(new Date(charge.created_at), 'HH:00')
          : format(new Date(charge.created_at), 'MM-dd');
        acc[key] = (acc[key] || 0) + charge.amount;
        return acc;
      }, {});

      const result = Object.entries(grouped).map(([label, value]) => ({ label, value }));
      setChartData(result);
    };

    fetchData();
  }, [range, customStart, customEnd]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Receita dos últimos {range === 'custom' ? 'personalizado' : range}</h2>
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
            <label className="block text-sm text-gray-600">Início</label>
            <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Fim</label>
            <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="border px-2 py-1 rounded" />
          </div>
        </div>
      )}

      <div className="h-64 border rounded bg-gray-50 p-4 text-gray-400 flex justify-center items-center">
        {chartData.length === 0 ? 'Sem dados para exibir' : (
          <ul className="w-full space-y-2 text-sm text-left">
            {chartData.map((item) => (
              <li key={item.label} className="text-black">{item.label}: R$ {item.value.toFixed(2)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
