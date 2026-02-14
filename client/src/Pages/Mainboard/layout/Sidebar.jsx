import {
  Home,
  LayoutDashboard,
  FileText,
  Key,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navigation = [
  { id: "home", name: "Home", icon: Home },
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "documentation", name: "Documentation", icon: FileText },
];

function Sidebar({ activeTab, setActiveTab, user, handleLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="w-64 flex-shrink-0 border-r border-gray-900 bg-gray-950 relative">

      {/* Logo */}
      <div className="p-6 border-b border-gray-900">
        <div className="font-semibold text-lg">Cortex</div>
        <div className="text-xs text-gray-600">AI MODERATION</div>
      </div>

      {/* Navigation */}
      <div className="p-4">

        <nav className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-gray-900 text-white border border-gray-800"
                  : "text-gray-400 hover:text-white hover:bg-gray-900/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>

              {activeTab === item.id && (
                <ChevronRight className="ml-auto w-4 h-4 text-blue-500" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-900">

        {/* Get API Key */}
        <button onClick={() => navigate('/cortex/dashboard')} className="w-full mb-3 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2">
          <Key className="w-4 h-4" />
          Get API Key
        </button>

        {/* Settings */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/50 transition-colors mb-2">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 overflow-hidden">
              <img
                src={user?.picture || "/default-avatar.png"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>


            <div className="flex-1 text-left">
              <div className="font-medium text-sm truncate">
                {user?.name || "User"}
              </div>
              <div className="text-xs text-gray-600 truncate">
                {user?.email}
              </div>
            </div>
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-full left-2 right-2 mb-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50">

              {/* Profile */}
              <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                <img
                  src={user?.picture || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border border-gray-700 object-cover"
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">
                    {user?.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-1 border-b border-gray-800">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded">
                  Switch Account
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>

              {/* Legal */}
              <div className="px-3 py-2 text-xs text-gray-500 flex justify-between">
                <button className="hover:text-gray-300">
                  Privacy Policy
                </button>
                <button className="hover:text-gray-300">
                  Terms of Service
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
