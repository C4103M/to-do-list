import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsLeftIcon } from "lucide-react";

function Dashbord() {
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(
    localStorage.getItem("selectedDay") || null
  );

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("selectedDay", selectedDay);
  }, [selectedDay]);

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= numDays; i++) {
      daysArray.push(new Date(year, month, i));
    }

    return daysArray;
  }

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  function prevMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }

  function toggleTask(dayString, index) {
    const dayTasks = [...(tasks[dayString] || [])];
    dayTasks[index].done = !dayTasks[index].done;
    setTasks({ ...tasks, [dayString]: dayTasks });
  }

  function removeTask(dayString, index) {
    const dayTasks = [...(tasks[dayString] || [])];
    dayTasks.splice(index, 1);
    setTasks({ ...tasks, [dayString]: dayTasks });
  }

  return (
    <div className="flex h-screen p-6 gap-6 relative bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition"
      >
        <ChevronsLeftIcon className="w-6 h-6 text-indigo-600" />
      </button>

      {/* Calendário */}
      <div className="w-1/2 bg-gray-50 p-6 rounded-3xl shadow-lg mt-20">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="text-indigo-600 font-bold text-lg hover:text-indigo-800 transition"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={nextMonth}
            className="text-indigo-600 font-bold text-lg hover:text-indigo-800 transition"
          >
            &gt;
          </button>
        </div>

        {/* Dias da semana */}
        <div className="grid grid-cols-7 mb-2 text-center font-semibold text-gray-500">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7 gap-3">
          {getDaysInMonth(currentMonth).map((day, index) => {
            if (!day) return <div key={index}></div>;
            const dayString = formatDate(day);
            const dayTasks = tasks[dayString] || [];
            const isSelected = selectedDay === dayString;

            return (
              <div
                key={dayString}
                onClick={() => setSelectedDay(dayString)}
                className={`p-3 rounded-xl cursor-pointer transition transform hover:scale-105
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white"
                  }
                  flex flex-col items-center justify-center`}
              >
                <span className="font-semibold">{day.getDate()}</span>
                {dayTasks.length > 0 && (
                  <div className="mt-1 text-xs text-green-500">
                    • {dayTasks.filter((t) => !t.done).length} pendente(s)
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-1/2 bg-white p-6 rounded-3xl shadow-lg flex flex-col mt-20">
        <h3 className="font-bold text-2xl mb-6">
          Tarefas de {selectedDay || "selecione um dia"}
        </h3>

        {selectedDay && (
          <>
            <ul className="mb-4 flex-1 overflow-auto space-y-3">
              {(tasks[selectedDay] || []).map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(selectedDay, index)}
                      className="w-5 h-5 accent-indigo-600"
                    />
                    <span
                      className={task.done ? "line-through text-gray-400" : ""}
                    >
                      {task.text}
                    </span>
                  </label>
                  <button
                    onClick={() => removeTask(selectedDay, index)}
                    className="text-red-500 font-bold text-xl hover:text-red-700 transition"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <input
              type="text"
              placeholder="Nova tarefa"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  const newTask = { text: e.target.value.trim(), done: false };
                  setTasks({
                    ...tasks,
                    [selectedDay]: [...(tasks[selectedDay] || []), newTask],
                  });
                  e.target.value = "";
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashbord;
