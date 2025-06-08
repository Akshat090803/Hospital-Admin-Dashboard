// AddScheduleModal.jsx
import React from "react";

function AddScheduleModal({
  darkMode,
  newSchedule,
  setNewSchedule,
  addSchedule,
  setShowAddSchedule,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`relative p-6 rounded-xl shadow-2xl w-full max-w-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h3 className="text-2xl font-bold mb-6">Add New Schedule Entry</h3>
        <div className="mb-4">
          <label htmlFor="scheduleTitle" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="scheduleTitle"
            value={newSchedule.title}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, title: e.target.value })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g., Dr. Lee - Patient Consultation"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="scheduleDate" className="block text-sm font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="scheduleDate"
            value={newSchedule.date}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: e.target.value })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowAddSchedule(false)}
            className={`px-5 py-2 rounded-lg transition-colors ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={addSchedule}
            className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Add Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddScheduleModal;