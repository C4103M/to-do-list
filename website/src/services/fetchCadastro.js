import verificarRegistro from "./verificarRegistro";

async function fetchCadastro({ name, email, password, confirmPassword }) {
  const resultado = verificarRegistro({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!resultado.valido) {
    throw new Error(resultado.mensagem);
  }

  const resposta = await fetch("http://localhost:8080/api/public/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resultado.user),
  });

  if (!resposta.ok) {
    throw new Error("Erro no cadastro");
  }

  const dados = await resposta.json();
  console.log("Resposta da API:", dados);
  return dados;
}

export default fetchCadastro;
