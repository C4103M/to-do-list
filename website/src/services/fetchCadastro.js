import { Navigate } from "react-router-dom";
import verificarRegistro from "./verificarRegistro";

async function fetchCadastro({ name, email, password, confirmPassword }, e) {
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
    const resposta = await fetch("http://localhost:8080/api/public/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultado.user),
    });

    if (!resposta.ok) {
      throw new Error("Erro no cadastro");
    }

    const dados = await resposta.json();

    alert("Usuário cadastrado com sucesso!");
    console.log("Resposta da API:", dados);

    Navigate("/");
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar usuário.");
  }
}

export default fetchCadastro;
