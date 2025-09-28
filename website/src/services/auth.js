import { jwtDecode } from 'jwt-decode';

export function getUserFromStorage() {
  const token = localStorage.getItem("user");
  if (!token) return null;

  try {
    return jwtDecode(token); // aqui usamos a função decode diretamente
  } catch (error) {
    console.error("Erro ao decodificar token", error);
    return null;
  }
}
