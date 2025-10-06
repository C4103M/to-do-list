import { useState } from "react";

export function TaskList({ selectedDay, tasks, onAddTask, onToggleTask, onRemoveTask }) {
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(selectedDay, newTaskText.trim());
      setNewTaskText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  
  const tasksForSelectedDay = tasks[selectedDay] || [];

  return (
    <div className="w-1/2 bg-white p-6 rounded-3xl shadow-lg flex flex-col mt-20">
      <h3 className="font-bold text-2xl mb-6">
        Tarefas de {selectedDay || "selecione um dia"}
      </h3>
      {selectedDay && (
        <>
          <ul className="mb-4 flex-1 overflow-auto space-y-3">
            {tasksForSelectedDay.map((task, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggleTask(selectedDay, index)}
                    className="w-5 h-5 accent-indigo-600"
                  />
                  <span className={task.done ? "line-through text-gray-400" : ""}>{task.text}</span>
                </label>
                <button onClick={() => onRemoveTask(selectedDay, index)} className="text-red-500 font-bold text-xl hover:text-red-700 transition">
                  ×
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Nova tarefa (pressione Enter)"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </>
      )}
    </div>
  );
}

