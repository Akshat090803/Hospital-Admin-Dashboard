// AddDepartmentModal.jsx
import React from "react";

function AddDepartmentModal({
  darkMode,
  newDepartment,
  setNewDepartment,
  addDepartment,
  setShowAddDepartment,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div
        className={`relative  p-6 rounded-xl shadow-2xl w-full max-w-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h3 className="text-2xl font-bold mb-6">Add New Department</h3>
        <div className="mb-4">
          <label htmlFor="deptName" className="block text-sm font-medium mb-2">
            Department Name
          </label>
          <input
            type="text"
            id="deptName"
            value={newDepartment.dept}
            onChange={(e) =>
              setNewDepartment({ ...newDepartment, dept: e.target.value })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g., Radiology"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="staffCount" className="block text-sm font-medium mb-2">
            Staff Count
          </label>
          <input
            type="number"
            id="staffCount"
            value={newDepartment.staff}
            onChange={(e) =>
              setNewDepartment({ ...newDepartment, staff: parseInt(e.target.value) })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            min="0"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="patientCount" className="block text-sm font-medium mb-2">
            Patients
          </label>
          <input
            type="number"
            id="patientCount"
            value={newDepartment.patients}
            onChange={(e) =>
              setNewDepartment({ ...newDepartment, patients: parseInt(e.target.value) })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            min="0"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="capacity" className="block text-sm font-medium mb-2">
            Capacity (%)
          </label>
          <input
            type="text"
            id="capacity"
            value={newDepartment.capacity}
            onChange={(e) =>
              setNewDepartment({ ...newDepartment, capacity: e.target.value })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g., 80%"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={newDepartment.status}
            onChange={(e) =>
              setNewDepartment({ ...newDepartment, status: e.target.value })
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowAddDepartment(false)}
            className={`px-5 py-2 rounded-lg transition-colors ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={addDepartment}
            className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Add Department
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDepartmentModal;