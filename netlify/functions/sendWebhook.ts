import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Use a SERVICE ROLE KEY, não a anon
);

const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { user_id, payload, event: eventName } = body;

    if (!user_id || !payload || !eventName) {
      return {
        statusCode: 400,
        body: 'Missing required fields'
      };
    }

    const { data: config } = await supabase
      .from('api_configs')
      .select('webhook_url')
      .eq('user_id', user_id)
      .single();

    if (!config?.webhook_url) {
      return {
        statusCode: 404,
        body: 'Webhook URL not found for this user'
      };
    }

    await fetch(config.webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Howpay-Signature': 'placeholder-signature'
      },
      body: JSON.stringify({
        event: eventName,
        data: payload
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Webhook enviado com sucesso!' })
    };
  } catch (err: any) {
    console.error('Erro ao enviar webhook:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

export { handler };
