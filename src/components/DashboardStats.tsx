
import React from 'react';
import { Card } from '@/components/ui/card';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Receita Total',
      value: 'R$ 45.230,00',
      change: '+12%',
      changeType: 'positive',
      icon: '💰'
    },
    {
      title: 'Cobranças Pagas',
      value: '234',
      change: '+8%',
      changeType: 'positive',
      icon: '✅'
    },
    {
      title: 'Pendentes',
      value: '12',
      change: '-5%',
      changeType: 'negative',
      icon: '⏳'
    },
    {
      title: 'Taxa de Conversão',
      value: '94.2%',
      change: '+2%',
      changeType: 'positive',
      icon: '📈'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className={`text-sm mt-2 flex items-center ${
                stat.changeType === 'positive' ? 'text-success' : 'text-red-500'
              }`}>
                <span className="mr-1">
                  {stat.changeType === 'positive' ? '↗️' : '↘️'}
                </span>
                {stat.change} vs mês passado
              </p>
            </div>
            <div className="text-3xl">
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
