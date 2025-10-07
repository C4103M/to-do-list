export function verificarToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    if (payload.exp < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
//VER SE AINDA É NECESSARIO COM A MUDANÇA DOS TOKENS
