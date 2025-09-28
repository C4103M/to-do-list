import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import { getUserFromStorage } from "../services/auth";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function vaiParaCadastro() {
    navigate(`/cadastro`);
  }

  function vaiParaHome(e) {
    e.preventDefault();

    if (verificarLogin()) {
      navigate(`/home`);
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }

  function verificarLogin() {
    if (!user.trim() || !password.trim()) {
      return false;
    }

    const savedUser = getUserFromStorage();

    if (!savedUser) {
      return false;
    }

    // aqui você compara: usuário digitado vs usuário salvo
    if (savedUser.name === user && savedUser.password === password) {
      setUser("");
      setPassword("");
      return true;
    }

    return false;
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label className="block text-gray-600 text-sm mb-1">Senha</Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
