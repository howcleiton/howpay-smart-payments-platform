import { supabase } from '@/integrations/supabase/client';

export async function sendWebhook(userId: string, payload: any, event: string) {
  const { data: config } = await supabase
    .from('api_configs')
    .select('webhook_url')
    .eq('user_id', userId)
    .single();

  if (!config?.webhook_url) {
    console.warn('Webhook não configurado para o usuário.');
    return;
  }

  try {
    await fetch(config.webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Howpay-Signature': 'em breve vamos assinar isso com segurança 😉'
      },
      body: JSON.stringify({
        event,
        data: payload
      })
    });
    console.log('Webhook enviado com sucesso!');
  } catch (err) {
    console.error('Erro ao enviar webhook:', err);
  }
}
