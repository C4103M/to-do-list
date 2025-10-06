import { useNavigate } from "react-router-dom";
import { ChevronsLeftIcon } from "lucide-react";
import { Calendar } from "../components/Calendar";
import { TaskList } from "../components/TaskList";
import { useCalendar } from "../hooks/useCalendar";
import { useTasks } from "../hooks/useTasks";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Dashboard() {
  const navigate = useNavigate();
  const { currentMonth, days, prevMonth, nextMonth } = useCalendar();
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [selectedDay, setSelectedDay] = useLocalStorage("selectedDay", null);

  return (
    <div className="flex h-screen p-6 gap-6 relative bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition"
      >
        <ChevronsLeftIcon className="w-6 h-6 text-indigo-600" />
      </button>

      <Calendar
        currentMonth={currentMonth}
        days={days}
        tasks={tasks}
        selectedDay={selectedDay}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onDayClick={setSelectedDay}
      />

      <TaskList
        selectedDay={selectedDay}
        tasks={tasks}
        onAddTask={addTask}
        onToggleTask={toggleTask}
        onRemoveTask={removeTask}
      />
    </div>
  );
}

export default Dashboard;
