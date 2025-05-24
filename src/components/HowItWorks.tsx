
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Integre sua conta',
      description: 'Crie sua conta em minutos e configure suas preferências de pagamento',
      icon: '🔗'
    },
    {
      number: '2',
      title: 'Gere links ou botões',
      description: 'Crie links de pagamento personalizados ou integre nossa API simples',
      icon: '⚡'
    },
    {
      number: '3',
      title: 'Acompanhe em tempo real',
      description: 'Visualize seus recebimentos e métricas no dashboard intuitivo',
      icon: '📊'
    },
    {
      number: '4',
      title: 'Saque automaticamente',
      description: 'Configure repasses automáticos ou faça saques quando quiser',
      icon: '💸'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-black">Como funciona</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Em poucos passos você estará recebendo pagamentos online de forma profissional
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-howpay-gradient rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <div className="text-4xl">{step.icon}</div>
                  <h3 className="text-xl font-bold text-black">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
