import { jwtDecode } from "jwt-decode";

export function getUserFromStorage() {
  const token = localStorage.getItem("user");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Erro ao decodificar token", error);
    return null;
  }
}

//VER SE AINDA É NECESSARIO COM A MUDANÇA DOS TOKENS