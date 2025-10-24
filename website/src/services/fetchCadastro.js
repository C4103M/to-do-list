async function fetchCadastro(form_data) {
  console.log(form_data.get("nome"));
  console.log(form_data.get("email"));
  console.log(form_data.get("senha"));
  
  const resposta = await fetch("http://localhost:8080/api/public/cadastro", {
    method: "POST",
    body: form_data,
  });

  if (!resposta.ok) {
    throw new Error("Erro no cadastro");
  }

  const dados = await resposta.text();
  console.log("Resposta da API:", dados);
  return dados;
}

export default fetchCadastro;
