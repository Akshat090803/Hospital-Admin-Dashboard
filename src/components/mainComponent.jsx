// MainComponent.jsx

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AnalyticsView from "./AnalyticsView";
import KanbanView from "./KanbanView";
import CalendarView from "./CalendarView";
import TablesView from "./TablesView";
import AddTaskModal from "../modal/AddTaskModal";
import AddDepartmentModal from "../modal/AddDepartmentModal";
import AddScheduleModal from "../modal/AddScheduleModal";


function MainComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "medium" });
  const [newDepartment, setNewDepartment] = useState({
    dept: "",
    staff: 0,
    patients: 0,
    capacity: "0%",
    status: "Normal",
  });
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, title: "Review patient reports", priority: "high" },
      { id: 2, title: "Update medical inventory", priority: "medium" },
    ],
    inProgress: [
      { id: 3, title: "Staff evaluation meetings", priority: "high" },
      { id: 4, title: "Emergency protocol update", priority: "medium" },
    ],
    completed: [
      { id: 5, title: "Monthly budget review", priority: "low" },
      { id: 6, title: "Department coordination", priority: "medium" },
    ],
  });

  const [departments, setDepartments] = useState([
    {
      dept: "Cardiology",
      staff: 25,
      patients: 45,
      capacity: "75%",
      status: "Normal",
    },
    {
      dept: "Emergency",
      staff: 30,
      patients: 15,
      capacity: "90%",
      status: "High",
    },
    {
      dept: "Pediatrics",
      staff: 20,
      patients: 30,
      capacity: "60%",
      status: "Normal",
    },
    {
      dept: "Surgery",
      staff: 35,
      patients: 20,
      capacity: "85%",
      status: "Normal",
    },
  ]);

  const [staffSchedule, setStaffSchedule] = useState([
    { id: 1, title: "Dr. Smith - Surgery", date: "2025-01-15" },
    { id: 2, title: "Dr. Johnson - Rounds", date: "2025-01-15" },
    { id: 3, title: "Nurse Meeting", date: "2025-01-16" },
    { id: 4, title: "Dr. Akshat - CheckUp", date: "2025-01-16" },
  ]);

  const hospitalStats = {
    totalPatients: 1250,
    availableBeds: 45,
    staffOnDuty: 120,
    emergencyCases: 8,
  };

  const departmentPerformance = {
    labels: [
      "Cardiology",
      "Neurology",
      "Pediatrics",
      "Orthopedics",
      "Oncology",
    ],
    data: [85, 75, 90, 80, 70],
  };

  const patientTrends = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [320, 350, 290, 400, 380, 360],
  };

  const [activeTab, setActiveTab] = useState("analytics");

  const moveTask = (taskId, source, destination) => {
    const newTasks = { ...tasks };
    const taskToMove = newTasks[source].find((task) => task.id === taskId);
    newTasks[source] = newTasks[source].filter((task) => task.id !== taskId);
    newTasks[destination] = [...newTasks[destination], taskToMove];
    setTasks(newTasks);
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const newTaskObj = {
      id:
        Math.max(
          ...Object.values(tasks)
            .flat()
            .map((t) => t.id)
        ) + 1,
      ...newTask,
    };
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTaskObj],
    }));
    setNewTask({ title: "", priority: "medium" });
    setShowAddTask(false);
  };

  const removeTask = (taskId, status) => {
    setTasks((prev) => ({
      ...prev,
      [status]: prev[status].filter((task) => task.id !== taskId),
    }));
  };

  const addDepartment = () => {
    if (!newDepartment.dept.trim()) return;
    setDepartments((prev) => [...prev, newDepartment]);
    setNewDepartment({
      dept: "",
      staff: 0,
      patients: 0,
      capacity: "0%",
      status: "Normal",
    });
    setShowAddDepartment(false);
  };

  const removeDepartment = (deptName) => {
    setDepartments((prev) => prev.filter((dept) => dept.dept !== deptName));
  };

  const addSchedule = () => {
    if (!newSchedule.title.trim()) return;
    const newScheduleObj = {
      id: Math.max(...staffSchedule.map((s) => s.id)) + 1,
      ...newSchedule,
    };
    setStaffSchedule((prev) => [...prev, newScheduleObj]);
    setNewSchedule({
      title: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddSchedule(false);
  };

  const removeSchedule = (scheduleId) => {
    setStaffSchedule((prev) =>
      prev.filter((schedule) => schedule.id !== scheduleId)
    );
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowAddTask={setShowAddTask}
        setShowAddDepartment={setShowAddDepartment}
        setShowAddSchedule={setShowAddSchedule}
      />

      <div className="flex-1 min-h-screen lg:ml-[280px] pt-[64px] md:pt-[72px]">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-4 md:p-6 space-y-6">
          {activeTab === "analytics" && (
            <AnalyticsView
              darkMode={darkMode}
              hospitalStats={hospitalStats}
              departmentPerformance={departmentPerformance}
              patientTrends={patientTrends}
            />
          )}

          {activeTab === "kanban" && (
            <KanbanView
              darkMode={darkMode}
              tasks={tasks}
              moveTask={moveTask}
              removeTask={removeTask}
              setShowAddTask={setShowAddTask}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarView
              darkMode={darkMode}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              staffSchedule={staffSchedule}
              removeSchedule={removeSchedule}
              setShowAddSchedule={setShowAddSchedule}
            />
          )}

          {activeTab === "tables" && (
            <TablesView
              darkMode={darkMode}
              departments={departments}
              removeDepartment={removeDepartment}
              setShowAddDepartment={setShowAddDepartment}
            />
          )}
        </div>
      </div>

      {showAddTask && (
        <AddTaskModal
          darkMode={darkMode}
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          setShowAddTask={setShowAddTask}
        />
      )}
      {showAddDepartment && (
        <AddDepartmentModal
          darkMode={darkMode}
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          addDepartment={addDepartment}
          setShowAddDepartment={setShowAddDepartment}
        />
      )}
      {showAddSchedule && (
        <AddScheduleModal
          darkMode={darkMode}
          newSchedule={newSchedule}
          setNewSchedule={setNewSchedule}
          addSchedule={addSchedule}
          setShowAddSchedule={setShowAddSchedule}
        />
      )}
    </div>
  );
}

export default MainComponent;