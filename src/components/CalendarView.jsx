// CalendarView.jsx
import React from "react";
import { FaTrash, FaUserMd } from "react-icons/fa";

function CalendarView({
  darkMode,
  selectedDate,
  setSelectedDate,
  staffSchedule,
  removeSchedule,
  setShowAddSchedule,
}) {
  return (
    <div
      className={`p-4 md:p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold">Staff Schedule</h3>
        <button
          onClick={() => setShowAddSchedule(true)}
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Schedule
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-8 overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-7 gap-2 md:gap-4 mb-6">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() - date.getDay() + i);
              return (
                <div
                  key={i}
                  className={`p-2 md:p-3 rounded-xl text-center cursor-pointer transition-all ${
                    date.toDateString() === selectedDate.toDateString()
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-xs md:text-sm font-medium">
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-sm md:text-lg font-bold">
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          <h4 className="text-base md:text-lg font-semibold mb-4">
            Schedule for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h4>
          <div className="grid gap-4">
            {staffSchedule
              .filter(
                (event) =>
                  new Date(event.date).toDateString() ===
                  selectedDate.toDateString()
              )
              .map((event) => (
                <div
                  key={event.id}
                  className={`p-3 md:p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ${
                    darkMode ? "bg-gray-700" : "bg-blue-50"
                  } hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center w-full md:w-auto">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaUserMd className=" text-blue-500"/>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium block text-sm md:text-base">
                        {event.title}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500">
                        {new Date(event.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <button
                      onClick={() => removeSchedule(event.id)}
                      className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-100 rounded-full ml-2"
                    >
                      <FaTrash className=" text-sm md:text-base"/>
                    </button>
                  </div>
                </div>
              ))}
            {staffSchedule.filter(
              (event) =>
                new Date(event.date).toDateString() ===
                selectedDate.toDateString()
            ).length === 0 && (
              <div
                className={`p-4 rounded-lg text-center ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <p className="text-gray-500 text-sm md:text-base">
                  No schedules for this date
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Overview */}
      <div
        className={`mt-8 p-4 md:p-6 rounded-xl ${
          darkMode ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        <h4 className="text-base md:text-lg font-semibold mb-4">
          Monthly Overview
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-xs md:text-sm text-gray-500">
              Total Appointments
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {staffSchedule.length}
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-xs md:text-sm text-gray-500">
              Today's Appointments
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {
                staffSchedule.filter(
                  (event) =>
                    new Date(event.date).toDateString() ===
                    new Date().toDateString()
                ).length
              }
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-xs md:text-sm text-gray-500">
              Upcoming Week
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {
                staffSchedule.filter((event) => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  const nextWeek = new Date(
                    today.getTime() + 7 * 24 * 60 * 60 * 1000
                  );
                  return eventDate >= today && eventDate <= nextWeek;
                }).length
              }
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-xs md:text-sm text-gray-500">Completed</div>
            <div className="text-xl md:text-2xl font-bold">
              {
                staffSchedule.filter(
                  (event) => new Date(event.date) < new Date()
                ).length
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;