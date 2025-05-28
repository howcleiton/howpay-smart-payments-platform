import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const secureReset = async () => {
      // ⚠️ Força o logout ao abrir esta página
      await supabase.auth.signOut();

      // Libera o formulário apenas após garantir que ninguém está logado
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setConfirmed(true);
      } else {
        navigate("/dashboard"); // fallback (não deve acontecer após logout)
      }
    };

    secureReset();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      alert("Senha alterada com sucesso!");
      navigate("/login");
    }
  };

  if (!confirmed) return null; // Esconde conteúdo até garantir segurança

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-center">Redefinir senha</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Nova senha:</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Redefinir senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

