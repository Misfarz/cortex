import {
  Key,
  FileText,
  X,
  DollarSign,
  Copy,
  BarChart3,
  MoreVertical
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getProjectsApi } from "../../../api/ProjectApi";
import {
  createApiKeyApi,
  getApiKeysApi
} from "../../../api/ApiKeyApi";

function ApiKeys() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);

  const [apiKeyName, setApiKeyName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    fetchProjects();
    fetchApiKeys();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjectsApi();
      setProjects(res.projects || []);

      if (res.projects?.length > 0) {
        setSelectedProject(res.projects[0]._id);
      }
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const fetchApiKeys = async () => {
    try {
      const res = await getApiKeysApi();
      setApiKeys(res.apiKeys || []);
    } catch {
      toast.error("Failed to load API keys");
    }
  };
   

  /* ---------------- CREATE KEY ---------------- */

  const handleCreateApiKey = async () => {
    try {
      if (!apiKeyName.trim() || !selectedProject) return;

      await createApiKeyApi({
        name: apiKeyName,
        projectId: selectedProject,
      });

      toast.success("API key created");

      await fetchApiKeys();

      setApiKeyName("");
      setShowCreateModal(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create API key"
      );
    }
  };


  const handleCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("API key copied");
  } catch (err) {
    toast.error("Failed to copy");
  }
};



   const actionIcons = [
      { icon: Copy, label: "Copy project ID", key: "copy" },
      { icon: DollarSign, label: "Manage billing", key: "billing" },
      { icon: BarChart3, label: "View analytics", key: "analytics" },
      { icon: MoreVertical, label: "More options", key: "more" },
    ];
  

 

  return (
    <>
      <div className="space-y-6 p-1">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">
              API Keys
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage and monitor your API access keys
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm"
            >
              <Key className="w-4 h-4" />
              Create key
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/20">

          {/* Header */}
          <div className="grid grid-cols-12 px-4 py-3 text-xs text-gray-400 border-b border-gray-800 bg-gray-900/40">
            <div className="col-span-4">KEY</div>
            <div className="col-span-4">PROJECT</div>
            <div className="col-span-2">CREATED</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

         {apiKeys.length === 0 ? (
  <div className="p-6 text-center text-gray-500 text-sm">
    No API keys created yet
  </div>
) : (
  apiKeys.map((key) => (
    <div
      key={key._id}
      className="grid grid-cols-12 px-4 py-3 items-center border-b border-gray-800 hover:bg-gray-800/20 transition"
    >
      {/* KEY */}
      <div className="col-span-4">
        <div className="text-white font-medium">
          {key.maskedKey}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {key.name}
        </div>
      </div>

      {/* PROJECT */}
      <div className="col-span-4">
        <div className="text-white">
          {key.projectName}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {key.clientId}
        </div>
      </div>

      {/* CREATED */}
      <div className="col-span-2 text-sm text-gray-300">
        {new Date(key.createdAt).toLocaleDateString()}
      </div>

      {/* ACTIONS */}
      <div className="col-span-2 flex justify-end gap-2">
        <button onClick={() => handleCopy(key.fullKey)} className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white">
          <Copy className="w-4 h-4" />
        </button>

        <button className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white">
          <DollarSign className="w-4 h-4" />
        </button>

        <button className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white">
          <BarChart3 className="w-4 h-4" />
        </button>

        <button className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  ))
)}

        </div>
      </div>

      {/* ---------------- CREATE MODAL ---------------- */}

      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setShowCreateModal(false)}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Create new API key
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Add a new API key to get started
                  </p>
                </div>

                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4">

                <div>
                  <label className="text-sm text-gray-300">
                    Key name
                  </label>

                  <input
                    value={apiKeyName}
                    onChange={(e) => setApiKeyName(e.target.value)}
                    className="mt-2 w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">
                    Select project
                  </label>

                  <select
                    value={selectedProject}
                    onChange={(e) =>
                      setSelectedProject(e.target.value)
                    }
                    className="mt-2 w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select project</option>

                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 p-4 border-t border-gray-800">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateApiKey}
                  disabled={!apiKeyName.trim() || !selectedProject}
                  className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Create Key
                </button>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ApiKeys;
