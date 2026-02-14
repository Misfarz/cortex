import { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import {toast} from "react-hot-toast";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";
import { useNavigate } from "react-router-dom";

function Mainboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
 
  useEffect(() => {
  
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

   const navigate = useNavigate();

const handleLogout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out");

    navigate("/"); // go to login or landing page
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed");
  }
};


  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "dashboard":
        return <Dashboard />;
      case "documentation":
        return <Documentation />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        handleLogout={handleLogout}
      />

      <div className="flex-1 overflow-auto">
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

export default Mainboard;
