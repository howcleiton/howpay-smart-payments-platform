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
  const [hasCharges, setHasCharges] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        navigate('/login');
        return;
      }

      const userId = session.user.id;

      // Busca nome do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', userId)
        .single();

      if (!profileError) {
        setUserName(profile?.full_name || 'Usuário');
      }

      // Verifica se há cobranças
      const { data: charges, error: chargesError } = await supabase
        .from('charges')
        .select('id')
        .eq('user_id', userId)
        .limit(1);

      if (chargesError || !charges || charges.length === 0) {
        setHasCharges(false);
      }

      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) return null;

  if (!hasCharges) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-black mt-16">Olá, {userName ?? '...'}</h1>
        <p className="text-gray-600 text-lg">Você ainda não tem cobranças registradas.</p>
        <p className="text-gray-500">Clique em "Nova Cobrança" para começar.</p>
        <Button className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white shadow-lg">
          + Nova Cobrança
        </Button>
      </div>
    );
  }

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
