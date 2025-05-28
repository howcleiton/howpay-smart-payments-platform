import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChargesList from '@/components/ChargesList';
import CreateChargeModal from '@/components/CreateChargeModal';
import { supabase } from '@/integrations/supabase/client';

const Charges = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chargeCount, setChargeCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharges = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        return;
      }

      const { data, error } = await supabase
        .from('charges')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) {
        console.error('Erro ao buscar cobranças:', error.message);
        setChargeCount(0);
      } else {
        setChargeCount(data?.length ?? 0);
      }

      setLoading(false);
    };

    fetchCharges();
  }, []);

  if (loading) return null;

  const hasCharges = chargeCount && chargeCount > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">Cobranças</h1>
          <p className="text-gray-600">Gerencie todas as suas cobranças</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white shadow-lg"
        >
          + Nova Cobrança
        </Button>
      </div>

      {hasCharges ? (
        <Card className="p-6 border-2 border-gradient-to-r from-primary-100 to-secondary-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Buscar por cliente, valor ou status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 border-primary-200 focus:border-primary-500"
              />
              <Button variant="outline" className="border-primary-300 text-primary-600 hover:bg-primary-50">
                Filtrar
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              {chargeCount} cobrança{chargeCount === 1 ? '' : 's'} encontrada{chargeCount === 1 ? '' : 's'}
            </div>
          </div>

          <ChargesList searchTerm={searchTerm} />
        </Card>
      ) : (
        <div className="text-center py-20 text-gray-600 space-y-4">
          <p className="text-lg">Você ainda não tem nenhuma cobrança cadastrada.</p>
          <p>Crie sua primeira cobrança para começar a vender com o Howpay.</p>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white shadow-lg"
          >
            + Nova Cobrança
          </Button>
        </div>
      )}

      <CreateChargeModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Charges;
