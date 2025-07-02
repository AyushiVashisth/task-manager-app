import React, { createContext, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId } from "../utils/taskUtils";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

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

  const value = {
    tasks,

    addTask,
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
