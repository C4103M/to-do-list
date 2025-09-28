import { getUserFromStorage } from "../services/auth";
import ButtonDashbord from "./ButtonDashbord";
import HomeSquares from "./HomeSquares";
import TextSquares from "./TextSquare";

function Home() {
  const user = getUserFromStorage();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-lg flex flex-col items-start">
        <h2 className="text-xl font-bold mb-6 items-start">Menu</h2>

        <ButtonDashbord>Dashboard</ButtonDashbord>
        <ButtonDashbord>Tarefas</ButtonDashbord>
        <ButtonDashbord>Perfil</ButtonDashbord>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Bem-vindo, {user.name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HomeSquares>
            <h3 className="font-semibold">Tarefas Pendentes</h3>
            <TextSquares>Prova do Sacchi</TextSquares>
          </HomeSquares>
          <HomeSquares>
            <h3 className="font-semibold">Tarefas Concluídas</h3>
            <TextSquares>Listas do Renato</TextSquares>
          </HomeSquares>
          <HomeSquares>
            <h3 className="font-semibold">Próximos Eventos</h3>
            <TextSquares>Read Dead às 21:30</TextSquares>
          </HomeSquares>
        </div>
      </main>
    </div>
  );
}

export default Home;
