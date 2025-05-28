import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import CreateChargeModal from '@/components/CreateChargeModal';

type Charge = {
  id: string;
  customer_name: string;
  amount: number;
  status: string;
  method: string;
  created_at: string;
};

const Charges = () => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchCharges = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    if (!userId) return;

    const { data, error } = await supabase
      .from('charges')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar cobranças:', error.message);
    } else {
      setCharges(data as Charge[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cobranças</h1>
          <p className="text-gray-600">Gerencie todas as suas cobranças</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          + Nova Cobrança
        </Button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : charges.length === 0 ? (
        <p>Você ainda não tem nenhuma cobrança cadastrada.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse mt-4">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Cliente</th>
                <th className="p-2">Valor</th>
                <th className="p-2">Status</th>
                <th className="p-2">Método</th>
                <th className="p-2">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {charges.map((charge) => (
                <tr key={charge.id} className="border-b">
                  <td className="p-2">{charge.customer_name}</td>
                  <td className="p-2">R$ {charge.amount.toFixed(2)}</td>
                  <td className="p-2">
                    {charge.status === 'pending' && (
                      <span className="bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Pendente
                      </span>
                    )}
                    {charge.status === 'paid' && (
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Pago
                      </span>
                    )}
                    {charge.status === 'failed' && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Falhou
                      </span>
                    )}
                  </td>
                  <td className="p-2 uppercase">{charge.method}</td>
                  <td className="p-2">
                    {new Date(charge.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateChargeModal
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open);
          if (!open) fetchCharges(); // recarrega cobranças após nova criação
        }}
      />
    </div>
  );
};

export default Charges;
