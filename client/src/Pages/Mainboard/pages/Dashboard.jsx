import { useState } from "react";
import ApiKeys from "../dashboard/Apikeys";
import Projects from "../dashboard/Projects";

function Dashboard() {
  const [dashboardTab, setDashboardTab] = useState("api-keys");

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-gray-900 border border-gray-800 w-fit">
        <button
          onClick={() => setDashboardTab("api-keys")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            dashboardTab === "api-keys"
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          API Keys
        </button>

        <button
          onClick={() => setDashboardTab("projects")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            dashboardTab === "projects"
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          Projects
        </button>
      </div>

      {/* Content */}
      {dashboardTab === "api-keys" && <ApiKeys />}
      {dashboardTab === "projects" && <Projects />}

    </div>
  );
}

export default Dashboard;
