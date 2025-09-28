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

export function vaiParaHome(e, userInput, passwordInput, navigate, resetInputs) {
  e.preventDefault();

  if (verificarLogin(userInput, passwordInput)) {
    resetInputs();
    navigate("/home");
  } else {
    alert("Usuário ou senha incorretos.");
  }
}
