import React, { createContext, useContext, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId, reorderTasks } from "../utils/taskUtils";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useLocalStorage("taskFilter", "all");

  const addTask = useCallback(
    (text) => {
      if (!text.trim()) return false;

      const newTask = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      toast.success("Task added successfully! 🎉", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return true;
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task.id === id) {
            const updatedTask = { ...task, completed: !task.completed };

            if (updatedTask.completed) {
              toast.success("Task completed! ✅", {
                position: "bottom-right",
                autoClose: 2000,
              });
            } else {
              toast.info("Task marked as pending 📝", {
                position: "bottom-right",
                autoClose: 2000,
              });
            }

            return updatedTask;
          }
          return task;
        });

        return updatedTasks;
      });
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      const taskToDelete = tasks.find((task) => task.id === id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      toast.success("Task deleted successfully! 🗑️", {
        position: "bottom-right",
        autoClose: 2000,
      });

      toast.info(
        <div>
          <p>Task "{taskToDelete?.text}" deleted</p>
          <button
            onClick={() => {
              setTasks((prevTasks) => [...prevTasks, taskToDelete]);
              toast.success("Task restored! 🔄", {
                position: "bottom-right",
                autoClose: 2000,
              });
            }}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Undo
          </button>
        </div>,
        {
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: false,
        }
      );
    },
    [tasks, setTasks]
  );

  const updateTask = useCallback(
    (id, newText) => {
      if (!newText.trim()) return false;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, text: newText.trim() } : task
        )
      );

      toast.success("Task updated successfully! ✏️", {
        position: "bottom-right",
        autoClose: 2000,
      });

      return true;
    },
    [setTasks]
  );

  const reorderTaskList = useCallback(
    (sourceIndex, destinationIndex) => {
      setTasks((prevTasks) => {
        const reorderedTasks = reorderTasks(
          prevTasks,
          sourceIndex,
          destinationIndex
        );
        return reorderedTasks;
      });

      toast.info("Tasks reordered! 🔄", {
        position: "bottom-right",
        autoClose: 1500,
      });
    },
    [setTasks]
  );

  const clearCompleted = useCallback(() => {
    const completedTasks = tasks.filter((task) => task.completed);
    const completedCount = completedTasks.length;

    if (completedCount === 0) {
      toast.warning("No completed tasks to clear! 🤷‍♂️", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));

    toast.success(
      `${completedCount} completed task${
        completedCount > 1 ? "s" : ""
      } cleared! 🧹`,
      {
        position: "bottom-right",
        autoClose: 2000,
      }
    );

    toast.info(
      <div>
        <p>{completedCount} completed tasks cleared</p>
        <button
          onClick={() => {
            setTasks((prevTasks) => [...prevTasks, ...completedTasks]);
            toast.success("Completed tasks restored! 🔄", {
              position: "bottom-right",
              autoClose: 2000,
            });
          }}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Undo
        </button>
      </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: false,
      }
    );
  }, [tasks, setTasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }, [tasks]);

  const value = {
    tasks,
    filteredTasks,
    filter,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    reorderTaskList,
    clearCompleted,
    setFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
