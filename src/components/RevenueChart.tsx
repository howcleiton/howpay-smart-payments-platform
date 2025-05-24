
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const data = [
    { name: '1', value: 2400 },
    { name: '5', value: 1398 },
    { name: '10', value: 9800 },
    { name: '15', value: 3908 },
    { name: '20', value: 4800 },
    { name: '25', value: 3800 },
    { name: '30', value: 4300 }
  ];

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
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              formatter={(value) => [`R$ ${value}`, 'Receita']}
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
