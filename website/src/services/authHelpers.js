import { getUserFromStorage } from "./auth";

export function verificarLogin(userInput, passwordInput) {
  if (!userInput.trim() || !passwordInput.trim()) {
    return false;
  }

  const savedUser = getUserFromStorage();
  if (!savedUser) return false;

  if (savedUser.name === userInput && savedUser.password === passwordInput) {
    return true;
  }

  return false;
}

export async function vaiParaHome(e, user, password, navigate, resetInputs) {
  e.preventDefault();

  if (!user.trim() || !password.trim()) {
    alert("Preencha usuário e senha.");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:8080/api/public/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: user, password }),
    });

    if (!resposta.ok) {
      throw new Error("Usuário ou senha incorretos");
    }

    const dados = await resposta.json();

    localStorage.setItem("user", JSON.stringify(dados.user));

    alert("Login realizado com sucesso!");
    resetInputs();
    navigate("/home");
  } catch (erro) {
    console.error(erro);
    alert("Falha ao realizar login.");
  }
}
