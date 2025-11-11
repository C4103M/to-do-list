import { getUserFromStorage } from "./auth";

export function verificarLogin(emailInput, passwordInput) {
  if (!emailInput.trim() || !passwordInput.trim()) {
    return false;
  }

  const savedUser = getUserFromStorage();
  if (!savedUser) return false;

  if (savedUser.name === emailInput && savedUser.password === passwordInput) {
    return true;
  }

  return false;
}

export async function logar(e, form_data, resetInputs) {
  e.preventDefault();

  try {
    const resposta = await fetch("http://localhost:8080/api/public/login", {
      method: "POST",
      body: form_data,
    });
    //Verificar se retornou JSON (futuramente)
    const dados = await resposta.json();

    if (dados.status != 200) {
      throw new Error(dados.message);
    } else {
      alert("Login realizado com sucesso!");
      resetInputs();
      vaiParaHome();
    }
  } catch (erro) {
    console.error(erro);
    alert("Falha ao realizar login.");
  }
}

function vaiParaHome() {
  navigate("/home");
}
