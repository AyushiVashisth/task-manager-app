import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useTask } from "../contexts/TaskContext";
import { formatDate } from "../utils/taskUtils";

const TaskItem = ({
  task,
  isEditing,
  setEditingId,
  isDragDisabled = false,
  isDragging = false,
  showDragHandle = false,
}) => {
  const [editText, setEditText] = useState(task.text);
  const { toggleTask, deleteTask, updateTask } = useTask();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleToggle = useCallback(() => {
    if (isDragging) return;
    toggleTask(task.id);
  }, [task.id, toggleTask, isDragging]);

  const handleDelete = useCallback(() => {
    toast.warn(
      <div>
        <p>Delete task "{task.text}"?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              deleteTask(task.id);
              toast.dismiss();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  }, [task.id, task.text, deleteTask]);

  const handleEdit = useCallback(() => {
    if (isDragging) return;
    setEditingId(task.id);
    setEditText(task.text);
  }, [task.id, task.text, setEditingId, isDragging]);

  const handleSave = useCallback(() => {
    if (!editText.trim()) {
      toast.error("Task description cannot be empty! 📝", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    if (editText.trim() === task.text) {
      setEditingId(null);
      return;
    }

    const success = updateTask(task.id, editText);
    if (success) {
      setEditingId(null);
    }
  }, [editText, task.text, task.id, updateTask, setEditingId]);

  const handleCancel = useCallback(() => {
    setEditText(task.text);
    setEditingId(null);
    toast.info("Edit cancelled 🚫", {
      position: "bottom-right",
      autoClose: 1500,
    });
  }, [task.text, setEditingId]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        handleCancel();
      }
    },
    [handleSave, handleCancel]
  );

  const handleMouseDown = (e) => {
    if (isEditing || isDragDisabled) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-lg border-2 transition-all duration-200 animate-fade-in ${
        task.completed
          ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md"
      } ${isDragging ? "cursor-grabbing shadow-lg" : ""}`}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Drag Handle */}
        {showDragHandle && (
          <div
            className={`flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
              isDragging ? "text-blue-500" : ""
            }`}
            title="Drag to reorder"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            </svg>
          </div>
        )}

        <button
          onClick={handleToggle}
          onMouseDown={handleMouseDown}
          disabled={isEditing || isDragging}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ${
            isEditing || isDragging
              ? "cursor-not-allowed opacity-60"
              : task.completed
              ? "bg-green-600 border-green-600 text-white"
              : "border-gray-300 dark:border-gray-500 hover:border-green-500"
          }`}
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0" onMouseDown={handleMouseDown}>
          {isEditing ? (
            <div className="space-y-2">
              <input
                ref={inputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={200}
                placeholder="Enter task description..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={`text-sm font-medium transition-all duration-200 ${
                  task.completed
                    ? "text-gray-500 dark:text-gray-400 line-through"
                    : "text-gray-900 dark:text-white"
                } ${isDragging ? "select-none" : ""}`}
              >
                {task.text}
              </p>
              <p
                className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                  isDragging ? "select-none" : ""
                }`}
              >
                Created {formatDate(task.createdAt)}
              </p>
            </>
          )}
        </div>

        {!isEditing && (
          <div
            className={`flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              isDragging ? "pointer-events-none" : ""
            }`}
            onMouseDown={handleMouseDown}
          >
            <button
              onClick={handleEdit}
              disabled={isDragging}
              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
              aria-label="Edit task"
              title="Edit"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDragging}
              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
              aria-label="Delete task"
              title="Delete"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
