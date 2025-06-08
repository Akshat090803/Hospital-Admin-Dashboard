// TablesView.jsx
import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function TablesView({ darkMode, departments, removeDepartment, setShowAddDepartment }) {
  return (
    <div
      className={`p-4 md:p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg md:text-xl font-semibold">
          Hospital Departments
        </h3>
        <button
          onClick={() => setShowAddDepartment(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors "
        >
      
          
          Add Department
        </button>
      </div>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr
                  className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                >
                  <th className="p-4 text-left rounded-l-lg">Department</th>
                  <th className="p-4 text-left">Staff Count</th>
                  <th className="p-4 text-left">Patients</th>
                  <th className="p-4 text-left">Capacity</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    } border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <td className="p-4 whitespace-nowrap">{row.dept}</td>
                    <td className="p-4 whitespace-nowrap">{row.staff}</td>
                    <td className="p-4 whitespace-nowrap">{row.patients}</td>
                    <td className="p-4 whitespace-nowrap">{row.capacity}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          row.status === "Normal"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => removeDepartment(row.dept)}
                        className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-100 rounded-full"
                      >
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablesView;