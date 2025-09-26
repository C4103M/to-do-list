import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";

function Login() {
  const navigate = useNavigate();

  function vaiParaCadastro() {
    navigate(`/cadastro`);
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <Label className="block text-gray-600 text-sm mb-1">Usuário</Label>
            <Input
              type="text"
              placeholder="Digite seu usuário"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label className="block text-gray-600 text-sm mb-1">Senha</Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit">Entre</Button>
            <Button type="button" onClick={() => vaiParaCadastro()}>
              Cadastre-se
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
