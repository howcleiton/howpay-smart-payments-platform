import React from 'react';

const companies = [
  { name: 'TechCorp', icon: '🏢' },
  { name: 'StartupX', icon: '🚀' },
  { name: 'Commerce+', icon: '🛒' },
  { name: 'FinanceIO', icon: '💰' },
  { name: 'WebStore', icon: '🌐' },
  { name: 'AppSolutions', icon: '📱' },
  {
    name: 'BeeLog',
    logo: '/logos/belog.jpeg' // Corrigido para .jpeg
  }
];

const SocialProof = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-base font-semibold tracking-wide text-gray-600 uppercase">
          Empresas que confiam na Howpay
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-10">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-sm text-gray-500"
            >
              {company.icon ? (
                <span className="text-4xl mb-2">{company.icon}</span>
              ) : (
                <div className="w-10 h-10 mb-2">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              )}
              {company.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
