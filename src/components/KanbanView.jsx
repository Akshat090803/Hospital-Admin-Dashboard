
import React from "react";
import { FaTrash } from "react-icons/fa";

function KanbanView({ darkMode, tasks, moveTask, removeTask, setShowAddTask }) {
 

  const handleDragOver = (e) => {
    e.preventDefault(); // Essential to allow a drop
  };

  const handleDrop = (e, destinationStatus) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    // Ensure data is not empty and contains the expected format
    if (!data) return;

    const [taskId, sourceStatus] = data.split("|");
    if (taskId && sourceStatus && destinationStatus) {
      moveTask(parseInt(taskId), sourceStatus, destinationStatus);
    }
  };

  return (
    <div
      className={`p-4 md:p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg md:text-xl font-semibold">Task Management</h3>
        <button
          onClick={() => setShowAddTask(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
        
          Add Task
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
        {Object.entries(tasks).map(([status, taskList]) => (
          <div
            key={status}
            className={`${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } p-4 rounded-xl min-w-[300px] md:w-1/3`}
            // Add onDragOver and onDrop to the column div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h4 className="text-lg mb-4 capitalize font-semibold flex items-center">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  status === "todo"
                    ? "bg-yellow-400"
                    : status === "inProgress"
                    ? "bg-blue-400"
                    : "bg-green-400"
                }`}
              ></span>
              {status.replace(/([A-Z])/g, " $1").trim()}
            </h4>
            {taskList.length === 0 && (
              <div
                className={`text-center py-8 text-gray-500 italic ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No tasks here. Drag a task to add!
              </div>
            )}
            {taskList.map((task) => (
              <div
                key={task.id}
                className={`${
                  darkMode ? "bg-gray-600" : "bg-white"
                } p-4 rounded-lg mb-3 shadow-sm transform transition-transform hover:scale-102 cursor-move`}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData(
                    "text/plain",
                    `${task.id}|${status}` // Pass task ID and its current status
                  )
                }
                // Removed onDragOver and onDrop from individual tasks
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{task.title}</span>
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 rounded text-xs mr-2 ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      } text-white`}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => removeTask(task.id, status)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanView;