import { getUserFromStorage } from "../services/auth";

function Home() {
  const user = getUserFromStorage();

  return (
    <div>
      {user ? (
        <h1>Bem-vindo, {user.name}!</h1>
      ) : (
        <h1>Nenhum usuário logado.</h1>
      )}
    </div>
  );
}

export default Home;
