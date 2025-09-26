import { ChevronsLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";

function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute flex items-center justify-center mt-1 text-black"
        >
          <ChevronsLeftIcon />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cadastro
        </h2>
        <form className="space-y-4">
          <div>
            <Label className="block text-gray-600 text-sm mb-1">Usuário</Label>
            <Input type="text" placeholder="Digite seu usuário" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="Insira o seu email"></Input>
          </div>
          <div>
            <Label className="block text-gray-600 text-sm mb-1">Senha</Label>
            <Input type="password" placeholder="Digite sua senha" />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-3"
              type="password"
              placeholder="Confirme sua senha"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit">Entre</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
