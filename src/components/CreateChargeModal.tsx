import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

interface CreateChargeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateChargeModal: React.FC<CreateChargeModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    amount: '',
    paymentMethod: '',
    chargeType: 'single',
    dueDate: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação mínima
    if (!formData.customerName || !formData.customerEmail || !formData.amount || !formData.paymentMethod || !formData.dueDate) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) {
      alert('Usuário não autenticado.');
      return;
    }

    const { error } = await supabase.from('charges').insert([
      {
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        amount: parseFloat(formData.amount),
        due_date: formData.dueDate,
        method: formData.paymentMethod,
        type: formData.chargeType,
        description: formData.description,
        status: 'pending',
        user_id: user.id,
      }
    ]);

    if (error) {
      console.error('Erro ao criar cobrança:', error);
      alert('Erro ao criar cobrança. Veja o console para detalhes.');
      return;
    }

    alert('Cobrança criada com sucesso!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Cobrança</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome do cliente</Label>
              <Input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>
            <div>
              <Label>Email do cliente</Label>
              <Input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              />
            </div>
            <div>
              <Label>Valor</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <Label>Vencimento</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div>
              <Label>Método de Pagamento</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">Pix</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo de Cobrança</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, chargeType: value })} defaultValue="single">
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Única</SelectItem>
                  <SelectItem value="recorrente">Recorrente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Descrição (opcional)</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Criar Cobrança</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChargeModal;
