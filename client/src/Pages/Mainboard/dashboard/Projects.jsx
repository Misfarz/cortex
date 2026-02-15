import {
  FileText,
  Copy,
  BarChart3,
  MoreVertical,
  DollarSign,
  Plus,
  X
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProjectApi, getProjectsApi } from "../../../api/ProjectApi";
import { toast } from "react-hot-toast";

function Projects() {


  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  /* ---------------- ACTION ICONS ---------------- */

  const actionIcons = [
    { icon: Copy, key: "copy" },
    { icon: DollarSign, key: "billing" },
    { icon: BarChart3, key: "analytics" },
    { icon: MoreVertical, key: "more" },
  ];

  /* ---------------- LOAD PROJECTS ---------------- */

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjectsApi();
      setProjects(res.projects || []);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CREATE PROJECT ---------------- */

  const handleCreateProject = async () => {
    try {
      setCreating(true);
      const res = await createProjectApi({
        name: projectName,
      });

      toast.success(res.message);

      setProjectName("");
      setShowCreateModal(false);

      await fetchProjects();
    } catch (err) {
      console.error("Project creation error:", err);
      toast.error(
        err.response?.data?.message || "Failed to create project"
      );
    } finally {
      setCreating(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className="space-y-6 p-1">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Projects
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage all your projects and associated API keys
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-4 h-4" />
              New project
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/20">

          {/* Header */}
          <div className="grid grid-cols-12 px-4 py-3 text-xs text-gray-400 border-b border-gray-800 bg-gray-900/40">
            <div className="col-span-4">PROJECT</div>
            <div className="col-span-3">KEYS</div>
            <div className="col-span-3">CREATED</div>
            <div className="col-span-2 text-right pr-2">ACTIONS</div>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="p-6 text-gray-400 text-sm">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No projects created yet
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="grid grid-cols-12 px-4 py-3 items-center border-b border-gray-800 hover:bg-gray-800/20 transition"
              >
                {/* Project */}
                <div className="col-span-4">
                  <div className="text-white font-medium">
                    {project.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 font-mono">
                    {project._id}
                  </div>
                </div>

                {/* Keys Count */}
                <div className="col-span-3 text-sm text-white">
                  {project.keysCount || 0} key
                  {(project.keysCount || 0) !== 1 ? "s" : ""}
                </div>

                {/* Created */}
                <div className="col-span-3 text-sm text-gray-300">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end gap-2 pr-1">
                  {actionIcons.map(({ icon: Icon, key }) => (
                    <button
                      key={key}
                      className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CREATE PROJECT MODAL */}
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
                    Create new project
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Add a new project to manage API keys
                  </p>
                </div>

                <button
                  className="p-1.5 rounded-lg hover:bg-gray-800"
                  onClick={() => setShowCreateModal(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                <label className="text-sm text-gray-300">
                  Project name
                </label>

                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="mt-2 w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  autoFocus
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 p-4 border-t border-gray-800 bg-gray-900/50">
                <button
                  className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  onClick={handleCreateProject}
                  disabled={!projectName.trim() || creating}
                >
                  {creating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Projects;
