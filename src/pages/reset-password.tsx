import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Extrai tokens da URL do Supabase
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      // Se houver tokens, tenta iniciar a sessão
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          setError("Erro ao recuperar sessão: " + error.message);
          return;
        }
      }

      setReady(true); // Agora pode renderizar o formulário
    };

    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      alert("Senha redefinida com sucesso!");
      navigate("/login");
    }
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
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
