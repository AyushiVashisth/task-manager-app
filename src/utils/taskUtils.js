/**
 * Generate a unique ID for tasks
 * @returns {string} Unique identifier
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Reorder tasks array for drag and drop
 * @param {Array} tasks - Original tasks array
 * @param {number} sourceIndex - Source index
 * @param {number} destinationIndex - Destination index
 * @returns {Array} Reordered tasks array
 */
export function reorderTasks(tasks, sourceIndex, destinationIndex) {
  const result = Array.from(tasks);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);
  return result;
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Validate task text
 * @param {string} text - Task text
 * @returns {boolean} Is valid
 */
export function isValidTaskText(text) {
  return typeof text === "string" && text.trim().length > 0;
}
