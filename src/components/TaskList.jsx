import React, { useState } from "react";
import { useTask } from "../contexts/TaskContext";
import TaskItem from "./TaskItem";
import { toast } from "react-toastify";

const TaskList = React.memo(() => {
  const { filteredTasks, reorderTaskList, filter } = useTask();
  const [dragStartIndex, setDragStartIndex] = useState(null);
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index, e) => {
    if (currentlyEditingId) {
      e.preventDefault();
      return;
    }

    setDragStartIndex(index);
    const task = filteredTasks[index];
    toast.info(`Dragging "${task.text}" 🖱️`, {
      position: "bottom-right",
      autoClose: 1000,
    });

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  const handleDragOver = (index, e) => {
    if (currentlyEditingId || filter !== "all") return;

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (index, e) => {
    e.preventDefault();

    if (currentlyEditingId) return;

    if (filter !== "all") {
      toast.warning('Reordering is only available in "All Tasks" view 🔄', {
        position: "bottom-right",
        autoClose: 3000,
      });
      setDragStartIndex(null);
      setDragOverIndex(null);
      return;
    }

    if (dragStartIndex === null || dragStartIndex === index) {
      setDragStartIndex(null);
      setDragOverIndex(null);
      return;
    }

    reorderTaskList(dragStartIndex, index);

    const draggedTask = filteredTasks[dragStartIndex];
    toast.success(`"${draggedTask.text}" moved to position ${index + 1} 🎯`, {
      position: "bottom-right",
      autoClose: 2000,
    });

    setDragStartIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragStartIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4">
      {/* Instructions */}
      {filter === "all" && filteredTasks.length > 1 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
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
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            Drag the handle (⋮⋮) on the left side of tasks to reorder them
          </p>
        </div>
      )}

      <div className="space-y-3">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            draggable={filter === "all" && currentlyEditingId !== task.id}
            onDragStart={(e) => handleDragStart(index, e)}
            onDragOver={(e) => handleDragOver(index, e)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(index, e)}
            onDragEnd={handleDragEnd}
            className={`transition-all duration-200 ${
              dragStartIndex === index ? "opacity-50 transform scale-105" : ""
            } ${
              dragOverIndex === index && dragStartIndex !== index
                ? "transform translate-y-1 border-t-2 border-blue-500"
                : ""
            }`}
          >
            <TaskItem
              task={task}
              index={index}
              isEditing={currentlyEditingId === task.id}
              setEditingId={setCurrentlyEditingId}
              isDragDisabled={filter !== "all"}
              isDragging={dragStartIndex === index}
              showDragHandle={
                filter === "all" && currentlyEditingId !== task.id
              }
            />
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
            📝
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
          </p>
        </div>
      )}
    </div>
  );
});

TaskList.displayName = "TaskList";
export default TaskList;
