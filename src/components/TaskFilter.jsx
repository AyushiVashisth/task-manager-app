import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useTask } from '../contexts/TaskContext';

const filters = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'pending', label: 'Pending', icon: '⏳' },
  { key: 'completed', label: 'Completed', icon: '✅' }
];

const TaskFilter = React.memo(() => {
  const { filter, setFilter, stats, clearCompleted } = useTask();

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    
    const filterMessages = {
      all: 'Showing all tasks 📋',
      pending: 'Showing pending tasks ⏳',
      completed: 'Showing completed tasks ✅'
    };
    
    toast.info(filterMessages[newFilter], {
      position: "bottom-right",
      autoClose: 1500,
    });
  }, [setFilter]);

  const handleClearCompleted = useCallback(() => {
    if (stats.completed === 0) {
      toast.warning('No completed tasks to clear! 🤷‍♂️', {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    // Show confirmation toast
    toast.warn(
      <div>
        <p>Clear {stats.completed} completed task{stats.completed > 1 ? 's' : ''}?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              clearCompleted();
              toast.dismiss();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
          >
            Yes, Clear
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
  }, [clearCompleted, stats.completed]);

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {filters.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => handleFilterChange(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {key === 'all' ? stats.total : key === 'pending' ? stats.pending : stats.completed}
            </span>
          </button>
        ))}
      </div>

      {/* Stats and Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">{stats.total}</span> total tasks • 
          <span className="font-medium text-primary-600 dark:text-primary-400"> {stats.pending}</span> pending • 
          <span className="font-medium text-success-600 dark:text-success-400"> {stats.completed}</span> completed
        </div>
        
        {stats.completed > 0 && (
          <button
            onClick={handleClearCompleted}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors duration-200"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
});

TaskFilter.displayName = 'TaskFilter';

export default TaskFilter;