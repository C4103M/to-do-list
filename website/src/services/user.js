class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  validarCampos() {
    return (
      this.name.trim() !== "" &&
      this.email.trim() !== "" &&
      this.password.trim() !== ""
    );
  }
}

export default User;
