import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useTask } from "../contexts/TaskContext";

const TaskForm = React.memo(() => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useTask();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");

      if (!text.trim()) {
        setError("Please enter a task description");
        toast.error("Task description cannot be empty! 📝", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }

      if (text.trim().length > 200) {
        setError("Task description must be less than 200 characters");
        toast.error("Task description is too long! ✂️", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }

      const success = addTask(text);
      if (success) {
        setText("");
      }
    },
    [text, addTask]
  );

  const handleInputChange = useCallback(
    (e) => {
      setText(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          maxLength={200}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            error
              ? "border-red-300 dark:border-red-600"
              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
          }`}
          aria-describedby={error ? "task-error" : undefined}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          Add
        </button>
      </div>

      {error && (
        <p
          id="task-error"
          className="text-sm text-red-600 dark:text-red-400 animate-fade-in"
        >
          {error}
        </p>
      )}

      <div className="text-right text-xs text-gray-500 dark:text-gray-400">
        {text.length}/200 characters
      </div>
    </form>
  );
});

TaskForm.displayName = "TaskForm";

export default TaskForm;
