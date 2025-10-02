import User from "./user";

function verificarRegistro({ name, email, password, confirmPassword }) {
  const novoUser = new User(name, email, password);

  if (!novoUser.validarCampos()) {
    return { valido: false, mensagem: "Preencha todas as informações." };
  }

  if (password !== confirmPassword) {
    return { valido: false, mensagem: "A senha não coincide." };
  }

  return { valido: true, user: novoUser };
}

export default verificarRegistro;
