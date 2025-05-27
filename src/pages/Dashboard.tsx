import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardStats from '@/components/DashboardStats';
import RecentCharges from '@/components/RecentCharges';
import RevenueChart from '@/components/RevenueChart';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetchName = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        navigate('/login');
        return;
      }

      const userId = session.user.id;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar nome:', error.message);
      } else {
        setUserName(profile?.full_name || 'Usuário');
      }
    };

    checkAuthAndFetchName();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black mt-16 md:mt-0">
            Olá, {userName ?? '...'}
          </h1>
          <p className="text-gray-600">Visão geral dos seus pagamentos</p>
        </div>
        <Button className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white shadow-lg">
          + Nova Cobrança
        </Button>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentCharges />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
