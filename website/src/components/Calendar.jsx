import { weekDays, formatDate } from '../utils/dateUtils';

export function Calendar({
  currentMonth,
  days,
  tasks,
  selectedDay,
  onPrevMonth,
  onNextMonth,
  onDayClick,
}) {
  return (
    <div className="w-1/2 bg-gray-50 p-6 rounded-3xl shadow-lg mt-20">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onPrevMonth} className="text-indigo-600 font-bold text-lg hover:text-indigo-800 transition">
          &lt;
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={onNextMonth} className="text-indigo-600 font-bold text-lg hover:text-indigo-800 transition">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2 text-center font-semibold text-gray-500">
        {weekDays.map((day) => (<div key={day}>{day}</div>))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, index) => {
          if (!day) return <div key={index}></div>;

          const dayString = formatDate(day);
          const dayTasks = tasks[dayString] || [];
          const isSelected = selectedDay === dayString;

          return (
            <div
              key={dayString}
              onClick={() => onDayClick(dayString)}
              className={`p-3 rounded-xl cursor-pointer transition transform hover:scale-105 ${isSelected ? "bg-indigo-600 text-white shadow-md" : "bg-white"} flex flex-col items-center justify-center`}
            >
              <span className="font-semibold">{day.getDate()}</span>
              {dayTasks.length > 0 && (
                <div className="mt-1 text-xs text-green-500">• {dayTasks.filter((t) => !t.done).length} pendente(s)</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

