import User from "./user";
import jwtEncode from "jwt-encode";

function verificarRegistro({
  name,
  email,
  password,
  confirmPassword,
  navigate,
}) {
  console.log("Dados recebidos no verificarRegistro:", {
    name,
    email,
    password,
    confirmPassword,
  });

  const novoUser = new User(name, email, password);

  if (!novoUser.validarCampos()) {
    alert("Preencha todas as informações.");
    return;
  }

  if (password !== confirmPassword) {
    alert("A senha não coincide. Mude ou tente novamente");
    return;
  }

  const secret = import.meta.env.VITE_JWT_SECRET;
  const token = jwtEncode(
    {
      name: novoUser.name,
      email: novoUser.email,
      password: novoUser.password, // só para teste local
    },
    secret
  );

  localStorage.setItem("user", token);

  alert("Usuário cadastrado com sucesso!");
  navigate("/");
}

export default verificarRegistro;
