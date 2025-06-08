
import {
  FaAmbulance,
  FaArrowDown,
  FaArrowUp,
  FaBed,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

// Import Recharts components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AnalyticsView({
  darkMode,
  hospitalStats,
  departmentPerformance,
  patientTrends,
}) {
  const statCards = [
    {
      title: "Total Patients",
      value: hospitalStats.totalPatients,
      icon: <FaUserInjured className="text-blue-500 text-xl" />,
      color: "bg-blue-100",
      trend: { value: 4.5, up: true, icon: <FaArrowUp className="mr-2" /> },
    },
    {
      title: "Available Beds",
      value: hospitalStats.availableBeds,
      icon: <FaBed className="text-green-500 text-xl" />,
      color: "bg-green-100",
      trend: { value: 2.1, up: false, icon: <FaArrowDown className="mr-2" /> },
    },
    {
      title: "Staff on Duty",
      value: hospitalStats.staffOnDuty,
      icon: <FaUserMd className="text-purple-500 text-xl" />,
      color: "bg-purple-100",
      trend: { value: 1.2, up: true, icon: <FaArrowUp className="mr-2" /> },
    },
    {
      title: "Emergency Cases",
      value: hospitalStats.emergencyCases,
      icon: <FaAmbulance className="text-red-500 text-xl" />,
      color: "bg-red-100",
      trend: { value: 3.2, up: true, icon: <FaArrowUp className="mr-2" /> },
    },
  ];

  // --- Prepare Data for Recharts ---

  // Department Performance (Bar Chart)
  const departmentChartData = departmentPerformance.labels.map((label, index) => ({
    name: label,
    Performance: departmentPerformance.data[index],
  }));

  // Patient Trends (Line Chart)
  const patientChartData = patientTrends.labels.map((label, index) => ({
    name: label,
    Patients: patientTrends.data[index],
  }));

  // New Chart Data: Bed Occupancy (Pie Chart) - Dummy Data
  const bedOccupancyData = [
    { name: "Occupied", value: hospitalStats.totalPatients - hospitalStats.availableBeds },
    { name: "Available", value: hospitalStats.availableBeds },
  ];
  const PIE_COLORS = ["#EF4444", "#22C55E"]; // Red for occupied, Green for available

  // New Chart Data: Daily Admissions (Bar Chart) - Dummy Data
  const dailyAdmissionsData = [
    { day: "Mon", Admissions: 25 },
    { day: "Tue", Admissions: 30 },
    { day: "Wed", Admissions: 20 },
    { day: "Thu", Admissions: 35 },
    { day: "Fri", Admissions: 28 },
    { day: "Sat", Admissions: 15 },
    { day: "Sun", Admissions: 10 },
  ];


  // --- Custom Recharts Components (for styling) ---

  // Custom Bar for rounded corners and gradient fill
  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 5;

    return (
      <g>
        <defs>
          <linearGradient id={fill.slice(1) + "Gradient"} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity={1} />
            <stop offset="100%" stopColor={fill + "B3"} stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={`url(#${fill.slice(1)}Gradient)`}
          rx={radius}
          ry={radius}
        />
      </g>
    );
  };

  // Custom Tooltip for Department Performance
  const CustomDepartmentTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-2 rounded shadow-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-semibold">{label}</p>
          <p className="text-blue-400">{`Performance : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Patient Trends (Line Chart)
  const CustomPatientTrendsTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-2 rounded shadow-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-semibold">{label}</p>
          <p className="text-green-400">{`Patients : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

    // Custom Tooltip for Daily Admissions (Bar Chart)
  const CustomDailyAdmissionsTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-2 rounded shadow-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-semibold">Day: {label}</p>
          <p className="text-purple-400">{`Admissions: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

    // Custom Recharts Legend for Dark Mode (if needed, default often works fine)
    const CustomLegend = ({ payload }) => {
        return (
            <ul className="flex justify-center mt-2 flex-wrap gap-x-4">
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} className="flex items-center text-sm">
                        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };


  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`p-4 md:p-6 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg transform transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm md:text-base text-gray-500">
                  {stat.title}
                </h3>
                <p className="text-2xl md:text-3xl font-bold mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 ${stat.color} rounded-full`}>
                {stat.icon}
              </div>
            </div>
            <div
              className={`flex items-center ${
                stat.trend.up ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.trend.icon}
              <span className="text-sm">
                {stat.trend.value}% from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section 1: Department Performance (Bar Chart) & Patient Trends (Line Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance Chart */}
        <div
          className={`p-4 md:p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg md:text-xl font-semibold">
              Department Performance
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={departmentChartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barCategoryGap="10%"
              barGap={5}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} vertical={false} />
              <XAxis dataKey="name" stroke={darkMode ? "#D1D5DB" : "#6B7280"} interval={0} angle={-30} textAnchor="end" height={60} />
              <YAxis
                unit="%"
                stroke={darkMode ? "#D1D5DB" : "#6B7280"}
                domain={[0, 100]}
              />
              <Tooltip cursor={{ fill: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(209, 213, 219, 0.2)' }} content={<CustomDepartmentTooltip darkMode={darkMode} />} />
              <Legend />
              <Bar dataKey="Performance" fill="#3B82F6" shape={<CustomBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Trends Chart (Line Chart) */}
        <div
          className={`p-4 md:p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg md:text-xl font-semibold">
              Patient Trends
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={patientChartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
              <XAxis dataKey="name" stroke={darkMode ? "#D1D5DB" : "#6B7280"} interval={0} angle={-30} textAnchor="end" height={60} />
              <YAxis stroke={darkMode ? "#D1D5DB" : "#6B7280"} />
              <Tooltip cursor={{ strokeDasharray: '3 3', stroke: darkMode ? '#D1D5DB' : '#6B7280' }} content={<CustomPatientTrendsTooltip darkMode={darkMode} />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Patients"
                stroke="#22C55E"
                strokeWidth={2}
                dot={{ r: 4, fill: '#22C55E' }}
                activeDot={{ r: 8, stroke: '#22C55E', strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Section 2: Bed Occupancy (Pie Chart) & Daily Admissions (Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bed Occupancy Chart (Pie Chart) */}
        <div
          className={`p-4 md:p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-6">
            Bed Occupancy
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}> {/* Adjusted margin */}
              <Pie
                data={bedOccupancyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80} // **Reduced outerRadius to give more space for labels and legend**
                innerRadius={60} // Optional: creates a donut chart
                fill="#8884d8"
                labelLine={false}
                // Custom label function for positioning and styling
                label={({
                  cx,
                  cy,
                  midAngle,
                  outerRadius,
                  percent,
                  index,
                  name,
                }) => {
                  const RADIAN = Math.PI / 180;
                  // Position labels outside the pie slices for clarity
                  const radius = outerRadius + 20; // Distance of label from center
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill={darkMode ? "#D1D5DB" : "#6B7280"} // Label color
                      textAnchor={x > cx ? "start" : "end"} // Align text based on position
                      dominantBaseline="central"
                      className="text-xs" // Tailwind text-xs class
                    >
                      {`${name} (${(percent * 100).toFixed(0)}%)`}
                    </text>
                  );
                }}
              >
                {bedOccupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className={`p-2 rounded shadow-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
                      <p className="font-semibold">{data.name}</p>
                      <p>{`Beds: ${data.value}`}</p>
                    </div>
                  );
                }
                return null;
              }} />
              {/* Position the legend at the bottom to give more horizontal space */}
              <Legend
                verticalAlign="bottom"
                height={36} // Give some height for the legend
                align="center"
                wrapperStyle={{
                    paddingTop: '10px', // Add padding above the legend
                    color: darkMode ? '#D1D5DB' : '#6B7280' // Adjust legend text color
                }}
                content={<CustomLegend />} // Use custom legend for dark mode color
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Admissions Chart (Bar Chart) */}
        <div
          className={`p-4 md:p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-6">
            Daily Admissions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dailyAdmissionsData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} vertical={false} />
              <XAxis dataKey="day" stroke={darkMode ? "#D1D5DB" : "#6B7280"} />
              <YAxis stroke={darkMode ? "#D1D5DB" : "#6B7280"} />
              <Tooltip cursor={{ fill: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(209, 213, 219, 0.2)' }} content={<CustomDailyAdmissionsTooltip darkMode={darkMode} />} />
              <Legend />
              <Bar dataKey="Admissions" fill="#8B5CF6" shape={<CustomBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsView;