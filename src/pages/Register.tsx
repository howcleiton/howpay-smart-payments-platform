import { supabase } from '@/integrations/supabase/client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    document: '',
    companyName: '',
    plan: 'free'
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (signUpError) {
    alert("Erro ao criar conta: " + signUpError.message);
    return;
  }

  // ⚠️ Aguarde a sessão ser criada
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData.session?.user) {
    alert("Erro ao recuperar sessão do usuário.");
    return;
  }

  const user = sessionData.session.user;

  const { error: insertError } = await supabase.from("profiles").insert([
    {
      id: user.id,
      full_name: formData.fullName,
      document: formData.document,
      company_name: formData.companyName,
      plan: formData.plan,
      user_id: user.id,
    }
  ]);

  if (insertError) {
    alert("Erro ao salvar perfil: " + insertError.message);
    return;
  }

  alert("Conta criada com sucesso!");
  navigate("/dashboard");
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Crie sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">Comece a receber pagamentos hoje mesmo</p>
        </div>

        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName">Nome completo</Label>
                <Input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="mt-1" placeholder="João Silva" />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1" placeholder="joao@empresa.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1" placeholder="••••••••" />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="mt-1" placeholder="••••••••" />
              </div>
            </div>

            <div>
              <Label htmlFor="document">CPF ou CNPJ</Label>
              <Input id="document" name="document" type="text" required value={formData.document} onChange={handleChange} className="mt-1" placeholder="000.000.000-00 ou 00.000.000/0001-00" />
            </div>

            <div>
              <Label htmlFor="companyName">Nome da empresa</Label>
              <Input id="companyName" name="companyName" type="text" required value={formData.companyName} onChange={handleChange} className="mt-1" placeholder="Minha Empresa Ltda" />
            </div>

            <div>
              <Label htmlFor="plan">Plano</Label>
              <Select defaultValue="free" onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <div>
                      <div className="font-medium">Gratuito</div>
                      <div className="text-sm text-gray-500">20 cobranças/mês</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="premium">
                    <div>
                      <div className="font-medium">Premium - R$ 29/mês</div>
                      <div className="text-sm text-gray-500">Cobranças ilimitadas</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Aceito os <Link to="/terms" className="text-primary hover:text-primary-600">Termos e Condições</Link>
              </label>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white">
              Criar conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta? <Link to="/login" className="font-medium text-primary hover:text-primary-600">Fazer login</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
