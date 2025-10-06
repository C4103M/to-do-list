export async function verificarLogin(email, senha, navigate) {
  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const response = await fetch("https://api.exemplo.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      alert("Credenciais inválidas.");
      return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    alert("Login realizado com sucesso!");
    navigate("/dashboard");
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro de conexão com o servidor.");
  }
}
