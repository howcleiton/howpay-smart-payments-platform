import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Header = () => {
  const [userName, setUserName] = useState('Carregando...');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUserEmail(session.user.email || '');

        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('user_id', session.user.id)
          .single();

        setUserName(profile?.full_name || 'Usuário');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-600">Gerencie seus pagamentos e cobranças</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="relative border-primary-200 hover:bg-primary-50">
            🔔
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-howpay-gradient rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-medium text-sm">
                {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{userName}</div>
              <div className="text-xs text-gray-500">{userEmail}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
