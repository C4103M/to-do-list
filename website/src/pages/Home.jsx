import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../services/auth";
import ButtonDashbord from "./ButtonDashbord";
import HomeSquares from "./HomeSquares";
import TextSquares from "./TextSquare";

function Home() {
  const navigate = useNavigate();
  const user = getUserFromStorage();

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("tasks");
    if (savedData) {
      const allTasks = JSON.parse(savedData);

      const pending = [];
      const completed = [];
      const overdue = [];
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const dayString in allTasks) {
        const taskDate = new Date(dayString);
        taskDate.setMinutes(taskDate.getMinutes() + taskDate.getTimezoneOffset());
        taskDate.setHours(0, 0, 0, 0);

        allTasks[dayString].forEach(task => {
          const taskInfo = {
            ...task,
            date: new Date(dayString).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
          };
          
          if (task.done) {
            completed.push(taskInfo);
          } else {
            if (taskDate < today) {
              overdue.push(taskInfo);
            } else {
              pending.push(taskInfo);
            }
          }
        });
      }

      setCompletedTasks(completed);
      setPendingTasks(pending.sort((a, b) => new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'))));
      setOverdueTasks(overdue.sort((a, b) => new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'))));
    }
  }, []);

  function vaiParaDashbord() {
    navigate("/home/dashbord");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-lg flex flex-col items-start">
        <h2 className="text-xl font-bold mb-6 items-start">Menu</h2>
        <ButtonDashbord type="button" onClick={vaiParaDashbord}>Dashboard</ButtonDashbord>
        <ButtonDashbord>Tarefas</ButtonDashbord>
        <ButtonDashbord>Perfil</ButtonDashbord>
      </aside>
      
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Bem-vindo, {user.name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HomeSquares>
            <h3 className="font-semibold mb-2">Tarefas Atrasadas</h3>
            {overdueTasks.length > 0 ? (
              overdueTasks.map((task, index) => (
                <TextSquares key={index}>
                  <span className="text-red-600 font-medium">
                    {task.text} - <strong>{task.date}</strong>
                  </span>
                </TextSquares>
              ))
            ) : (
              <p className="text-sm text-gray-400">Nenhuma tarefa atrasada.</p>
            )}
          </HomeSquares>
          
          <HomeSquares>
            <h3 className="font-semibold mb-2">Tarefas Pendentes</h3>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task, index) => (
                <TextSquares key={index}>
                    {task.text} - <strong>{task.date}</strong>
                </TextSquares>
              ))
            ) : (
              <p className="text-sm text-gray-400">Tudo em dia!</p>
            )}
          </HomeSquares>

          <HomeSquares>
            <h3 className="font-semibold mb-2">Tarefas Concluídas</h3>
            {completedTasks.length > 0 ? (
              completedTasks.map((task, index) => (
                <TextSquares key={index}>{task.text}</TextSquares>
              ))
            ) : (
              <p className="text-sm text-gray-400">Nenhuma tarefa concluída ainda.</p>
            )}
          </HomeSquares>
        </div>
      </main>
    </div>
  );
}

export default Home;