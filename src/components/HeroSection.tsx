
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register', { state: { email } });
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                Infraestrutura de pagamento moderna para a nova internet
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Com Howpay, receba via Pix, boleto e cartão em segundos com integração simples e visualização poderosa.
              </p>
            </div>
            
            <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 text-base"
                required
              />
              <Button 
                type="submit"
                className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white h-12 px-8 shadow-lg"
              >
                Comece agora
              </Button>
            </form>
            
            <p className="text-sm text-gray-500">
              Gratuito para começar. Sem taxas de setup ou mensalidades.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              <div className="bg-gray-100 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Dashboard Financeiro</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receita hoje</span>
                    <span className="font-bold text-green-600">R$ 12.458,90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transações</span>
                    <span className="font-bold text-blue-600">247</span>
                  </div>
                  <div className="bg-howpay-gradient h-2 rounded-full"></div>
                  <div className="text-xs text-gray-500">Taxa de conversão: 98.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
