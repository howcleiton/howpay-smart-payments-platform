import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import CreateChargeModal from '@/components/CreateChargeModal';
import { sendWebhook } from '@/lib/webhook'; // <- IMPORTANTE

type Charge = {
  id: string;
  customer_name: string;
  amount: number;
  status: string;
  method: string;
  created_at: string;
  user_id: string;
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

    if (!error && data) setCharges(data as Charge[]);
    setLoading(false);
  };

  const handleMarkAsPaid = async (charge: Charge) => {
    const { error } = await supabase
      .from('charges')
      .update({ status: 'paid' })
      .eq('id', charge.id);

    if (error) {
      console.error('Erro ao marcar como paga:', error);
      return;
    }

    alert('Cobrança marcada como paga!');

    // Enviar webhook para o cliente (empresa)
    await sendWebhook(charge.user_id, {
      charge_id: charge.id,
      amount: charge.amount,
      status: 'paid',
      paid_at: new Date().toISOString()
    }, 'charge.paid');

    fetchCharges(); // recarrega lista
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cobranças</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>+ Nova Cobrança</Button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : charges.length === 0 ? (
        <p>Nenhuma cobrança encontrada.</p>
      ) : (
        <table className="w-full table-auto border-collapse mt-4">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Cliente</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Status</th>
              <th className="p-2">Método</th>
              <th className="p-2">Criado em</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {charges.map((charge) => (
              <tr key={charge.id} className="border-b">
                <td className="p-2">{charge.customer_name}</td>
                <td className="p-2">R$ {charge.amount.toFixed(2)}</td>
                <td className="p-2">{charge.status}</td>
                <td className="p-2">{charge.method.toUpperCase()}</td>
                <td className="p-2">
                  {new Date(charge.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="p-2">
                  {charge.status !== 'paid' && (
                    <Button size="sm" onClick={() => handleMarkAsPaid(charge)}>
                      Marcar como pago
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <CreateChargeModal
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open);
          if (!open) fetchCharges();
        }}
      />
    </div>
  );
};

export default Charges;
