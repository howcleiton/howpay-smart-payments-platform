
import React from 'react';

const Benefits = () => {
  const benefits = [
    {
      icon: '💳',
      title: 'Recebimentos via Pix, boleto e cartão',
      description: 'Aceite todos os métodos de pagamento mais usados no Brasil em uma única integração'
    },
    {
      icon: '🔌',
      title: 'API moderna com webhooks',
      description: 'Integração simples e robusta com documentação completa e suporte para desenvolvedores'
    },
    {
      icon: '🔄',
      title: 'Assinaturas e recorrência',
      description: 'Gerencie cobranças recorrentes e assinaturas de forma automatizada'
    },
    {
      icon: '📈',
      title: 'Dashboard detalhado',
      description: 'Painel de controle completo com métricas em tempo real e relatórios avançados'
    },
    {
      icon: '📊',
      title: 'Relatórios financeiros',
      description: 'Relatórios detalhados para controle financeiro e prestação de contas'
    },
    {
      icon: '⚡',
      title: 'Repasses automáticos',
      description: 'Configure repasses automáticos para sua conta bancária ou receba quando quiser'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-black">Por que escolher a Howpay?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos tudo que você precisa para aceitar pagamentos online de forma segura e eficiente
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-4xl">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-black">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
