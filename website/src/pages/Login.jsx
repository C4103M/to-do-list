import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { vaiParaHome as homeHelper } from "../services/authHelpers";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function resetInputs() {
    setUser("");
    setPassword("");
  }

  function vaiParaHome(e) {
    homeHelper(e, user, password, navigate, resetInputs);
  }

    function vaiParaCadastro() {
        navigate("/cadastro");
    }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-4" onSubmit={vaiParaHome}>
          <div>
            <Label className="block text-gray-600 text-sm mb-1">Usuário</Label>
            <Input
              type="text"
              placeholder="Digite seu usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <Label className="block text-gray-600 text-sm mb-1">Senha</Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit">Entre</Button>
            <Button type="button" onClick={vaiParaCadastro}>
              Cadastre-se
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
