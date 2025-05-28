// src/pages/ForgotPassword.tsx

import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://seusite.com/reset-password", // substitua pela URL correta do seu projeto
    });

    if (error) {
      alert("Erro ao enviar o link: " + error.message);
    } else {
      alert("Link de redefinição enviado para seu e-mail.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h2 className="text-2xl font-bold">Esqueci minha senha</h2>
      <div className="space-y-2 w-96">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleReset}>Enviar link de recuperação</Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
