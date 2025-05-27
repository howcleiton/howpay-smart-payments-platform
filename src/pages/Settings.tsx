import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

const Settings = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    companyName: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, company_name')
        .eq('user_id', userId)
        .single();

      if (data) {
        setUserData({
          fullName: data.full_name,
          email: data.email,
          companyName: data.company_name,
        });
      } else {
        console.error("Erro ao buscar dados do perfil:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie suas configurações da conta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Conta</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" value={userData.fullName} readOnly />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" value={userData.email} readOnly />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Nome da empresa</Label>
                <Input id="company" value={userData.companyName} readOnly />
              </div>
              <Button className="bg-primary hover:bg-primary-600 text-white" disabled>
                Salvar alterações
              </Button>
