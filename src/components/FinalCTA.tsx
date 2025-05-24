
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-black">
              Pronto para começar?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já confiam na Howpay para processar seus pagamentos online.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button className="bg-howpay-gradient hover:bg-howpay-gradient-reverse text-white px-8 py-4 text-lg shadow-lg">
                Criar minha conta grátis
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="px-8 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-50">
                Já tenho uma conta
              </Button>
            </Link>
          </div>
          
          <div className="pt-8 space-y-2">
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Sem taxas de setup</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Sem mensalidade</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Suporte 24/7</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
