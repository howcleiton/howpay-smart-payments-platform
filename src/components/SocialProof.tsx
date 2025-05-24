
import React from 'react';

const SocialProof = () => {
  const companies = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'StartupX', logo: '🚀' },
    { name: 'Commerce+', logo: '🛒' },
    { name: 'FinanceIO', logo: '💰' },
    { name: 'WebStore', logo: '🌐' },
    { name: 'AppSolutions', logo: '📱' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-8">
          <p className="text-gray-500 font-medium">Empresas que confiam na Howpay</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="text-3xl">{company.logo}</div>
                <span className="text-sm font-medium text-gray-600">{company.name}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-black">R$ 2.5B+</div>
                <div className="text-gray-600">Processados mensalmente</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">50K+</div>
                <div className="text-gray-600">Empresas ativas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">99.9%</div>
                <div className="text-gray-600">Uptime garantido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
