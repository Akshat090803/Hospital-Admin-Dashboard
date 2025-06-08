// AddTaskModal.jsx
import React from "react";

function AddTaskModal({ darkMode, newTask, setNewTask, addTask, setShowAddTask }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`relative p-6 rounded-xl shadow-2xl w-full max-w-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h3 className="text-2xl font-bold mb-6">Add New Task</h3>
        <div className="mb-4">
          <label htmlFor="taskTitle" className="block text-sm font-medium mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="taskTitle"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g., Prepare surgical schedule"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="taskPriority" className="block text-sm font-medium mb-2">
            Priority
          </label>
          <select
            id="taskPriority"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowAddTask(false)}
            className={`px-5 py-2 rounded-lg transition-colors ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={addTask}
            className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;