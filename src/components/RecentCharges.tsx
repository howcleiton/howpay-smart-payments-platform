import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type Charge = {
  id: string;
  customer_name: string;
  amount: number;
  status: string;
  method: string;
  created_at: string;
};

const RecentCharges = ({ empty = false }: { empty?: boolean }) => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharges = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session?.user) {
        console.error('Erro ao obter sessão:', sessionError?.message);
        setLoading(false);
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase
        .from('charges')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Erro ao buscar cobranças:', error.message);
      } else {
        setCharges(data ?? []);
      }

      setLoading(false);
    };

    fetchCharges();
  }, []);

  if (loading) return null;

  if (charges.length === 0 || empty) {
    return (
      <Card className="p-6 h-[300px] flex flex-col items-center justify-center text-gray-400 text-center">
        <p className="text-lg font-medium">Nenhuma cobrança recente encontrada.</p>
        <p className="text-sm mt-1">As cobranças aparecerão aqui assim que forem criadas.</p>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-400 text-white';
      case 'failed':
      case 'expired':
      case 'canceled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      case 'expired':
        return 'Não Pago';
      case 'canceled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'pix':
        return '📱';
      case 'boleto':
        return '📄';
      case 'cartao':
        return '💳';
      default:
        return '💰';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Últimas Cobranças</h3>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </div>

      <div className="space-y-4">
        {charges.map((charge) => (
          <div key={charge.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getMethodIcon(charge.method)}</div>
              <div>
                <p className="font-medium text-gray-900">{charge.customer_name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(charge.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">R$ {charge.amount.toFixed(2)}</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(charge.status)}`}>
                {getStatusText(charge.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentCharges;
