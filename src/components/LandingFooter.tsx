
import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/85e36274-7be9-41a3-bc7a-de6b6cc20c41.png" 
                  alt="Howpay Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-lg font-bold">Howpay</span>
            </div>
            <p className="text-gray-400">
              A infraestrutura de pagamento moderna para a nova internet.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Produtos</h4>
            <div className="space-y-2 text-gray-400">
              <div>Links de pagamento</div>
              <div>API de pagamentos</div>
              <div>Checkout personalizado</div>
              <div>Assinaturas</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <div className="space-y-2 text-gray-400">
              <div>Sobre nós</div>
              <div>Carreiras</div>
              <div>Imprensa</div>
              <div>Blog</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <div className="space-y-2 text-gray-400">
              <div>Central de ajuda</div>
              <div>Documentação</div>
              <div>Status do sistema</div>
              <div>Contato</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Howpay. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <div>Termos de uso</div>
            <div>Política de privacidade</div>
            <div>Cookies</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
