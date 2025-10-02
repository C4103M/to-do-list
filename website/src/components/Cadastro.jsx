import { ChevronsLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import verificarRegistro from "../services/verificarRegistro";

function Cadastro() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const resultado = verificarRegistro({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!resultado.valido) {
      alert(resultado.mensagem);
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:8080/api/public/cadastro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resultado.user),
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro no cadastro");
      }

      const dados = await resposta.json();

      alert("Usuário cadastrado com sucesso!");
      console.log("Resposta da API:", dados);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar usuário.");
    }
  }

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Usuário</Label>
            <Input
              type="text"
              placeholder="Digite seu usuário"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Insira o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
