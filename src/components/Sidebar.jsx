
import {
  FaBuilding,
  FaCalendarAlt, 
  FaChartLine,
  FaColumns,
  FaPlus,
  FaTable,
  FaTimes,
  FaHospitalSymbol, 
} from "react-icons/fa";

function Sidebar({
  darkMode,
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  setShowAddTask,
  setShowAddDepartment,
  setShowAddSchedule,
}) {
  const commonIconClass = "text-lg"; 

  const navItems = [
    { name: "Analytics", icon: <FaChartLine className={commonIconClass} />, tab: "analytics" },
    { name: "Kanban Board", icon: <FaColumns className={commonIconClass} />, tab: "kanban" },
    { name: "Calendar", icon: <FaCalendarAlt className={commonIconClass} />, tab: "calendar" },
    { name: "Tables", icon: <FaTable className={commonIconClass} />, tab: "tables" },
  ];

  const actionButtons = [
    { name: "Add Task", icon: <FaPlus className={commonIconClass} />, onClick: () => setShowAddTask(true), color: "blue" },
    { name: "Add Dept", icon: <FaBuilding className={commonIconClass} />, onClick: () => setShowAddDepartment(true), color: "green" },
    { name: "Add Schedule", icon: <FaCalendarAlt className={commonIconClass} />, onClick: () => setShowAddSchedule(true), color: "purple" }, 
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-full
        w-[280px]
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        z-40
        ${darkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-200"}
        border-r shadow-lg lg:shadow-none
        flex flex-col
      `}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Sidebar Header/Logo */}
        <div className="mb-10 mt-6 flex items-center justify-between lg:justify-start">
          <div className="flex items-center space-x-3">
            <FaHospitalSymbol className="text-3xl text-blue-500" /> {/* Larger, colored icon */}
            <h2 className="text-2xl font-bold font-roboto tracking-wide">Admin Panel</h2> 
          </div>
          <button
            className={`lg:hidden p-2 rounded-full transition-colors duration-200
                       ${darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-2"> {/* space-y-2 for consistent vertical spacing */}
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`
                w-full text-left py-3 px-5 rounded-lg flex items-center space-x-4
                transition-all duration-200 ease-in-out
                ${activeTab === item.tab
                  ? "bg-blue-600 text-white shadow-md font-semibold" 
                  : darkMode
                    ? "hover:bg-gray-700 hover:text-white"
                    : "hover:bg-blue-50 hover:text-blue-700" // Light mode hover
                }
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3"> 
          {actionButtons.map((button) => (
            <button
              key={button.name}
              onClick={button.onClick}
              className={`
                w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-3
                text-white font-medium
                transition duration-200 ease-in-out
                bg-${button.color}-500 hover:bg-${button.color}-600 shadow-md
              `}
            >
              {button.icon}
              <span>{button.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;