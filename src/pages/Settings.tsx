import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const load = async () => {
      const session = await supabase.auth.getSession();
      const user = session.data.session?.user;
      if (!user) return;

      setUserId(user.id);
      setEmail(user.email || '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .single();

      setFullName(profile?.full_name || '');

      const { data: apiConfig } = await supabase
        .from('api_configs')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (apiConfig) {
        setApiKey(apiConfig.api_key);
        setWebhookUrl(apiConfig.webhook_url || '');
      } else {
        // Cria novo registro se não existir
        const newKey = 'hpay_pk_' + crypto.randomUUID().replace(/-/g, '');
        setApiKey(newKey);

        await supabase.from('api_configs').insert({
          user_id: user.id,
          api_key: newKey,
          webhook_url: ''
        });
      }
    };

    load();
  }, []);

  const handleSaveWebhook = async () => {
    await supabase
      .from('api_configs')
      .update({ webhook_url: webhookUrl })
      .eq('user_id', userId);

    alert('Webhook atualizado!');
  };

  const handleRegenerateKey = async () => {
    const newKey = 'hpay_pk_' + crypto.randomUUID().replace(/-/g, '');
    setApiKey(newKey);

    await supabase
      .from('api_configs')
      .update({ api_key: newKey })
      .eq('user_id', userId);

    alert('Nova chave gerada!');
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Informações da Conta</h2>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nome completo" />
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Nome da empresa" />
          <Input value={email} disabled />
          <Button>Salvar alterações</Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Configurações de API</h2>
          <label className="block text-sm font-medium text-gray-700">Chave da API</label>
          <div className="flex gap-2">
            <Input value={apiKey} readOnly />
            <Button onClick={handleRegenerateKey}>Regenerar</Button>
          </div>
          <label className="block text-sm font-medium text-gray-700">URL do Webhook</label>
          <Input
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://seusite.com/webhook"
          />
          <Button onClick={handleSaveWebhook}>Salvar Webhook</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
