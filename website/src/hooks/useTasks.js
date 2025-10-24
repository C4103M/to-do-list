import { useLocalStorage } from "./useLocalStorage";

export function useTasks() {
    const [tasks, setTasks] = useLocalStorage("tasks", {});

    const addTask = (dayString, taskText) => {
        const newTask = { text: taskText, done: false };
        const dayTasks = tasks[dayString] || [];
        setTasks({
            ...tasks,
            [dayString]: [...dayTasks, newTask],
        });
    };

    const toggleTask = (dayString, taskIndex) => {
        const dayTasks = [...(tasks[dayString] || [])];
        dayTasks[taskIndex].done = !dayTasks[taskIndex].done;
        setTasks({ ...tasks, [dayString]: dayTasks });
    };

    const removeTask = (dayString, taskIndex) => {
        const dayTasks = [...(tasks[dayString] || [])];
        dayTasks.splice(taskIndex, 1);
        setTasks({ ...tasks, [dayString]: dayTasks });
    };

    return { tasks, addTask, toggleTask, removeTask };
}
