import React, { useState } from "react";
import { useKanbanStore } from "../store/kanbanStore";
import { Plus, Trash2, Pencil } from "lucide-react";

const Sidebar: React.FC = () => {
  const {
    projects,
    selectedProjectId,
    addProject,
    selectProject,
    renameProject,
    deleteProject,
  } = useKanbanStore();

  const [newProjectName, setNewProjectName] = useState("");




  return (
    <div
      className="w-80 bg-cover bg-center bg-no-repeat h-screen p-6 shadow-lg overflow-y-auto"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/736x/ac/c3/67/acc3676cc151d3da6df29ca34cc93a6a.jpg")',
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-5 text-white tracking-wide">
          🚀 Projects
        </h2>
  
        <div className="flex mb-6 gap-2">
          <input
            type="text"
            placeholder="Create new project"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (newProjectName.trim()) {
                addProject(newProjectName.trim());
                setNewProjectName("");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow transition"
            title="Add Project"
          >
            <Plus size={18} />
          </button>
        </div>
  
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              onClick={() => selectProject(project.id)}
              className={`group flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
                project.id === selectedProjectId
                  ? "bg-blue-100 dark:bg-blue-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span className="flex-1 font-medium text-gray-800 dark:text-white truncate">
                {project.name}
              </span>
  
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="text-yellow-500 hover:text-yellow-400"
                  title="Rename"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newName = prompt("Rename project:", project.name);
                    if (newName) renameProject(project.id, newName);
                  }}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="text-red-500 hover:text-red-400"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm("Are you sure you want to delete this project?")
                    ) {
                      deleteProject(project.id);
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default Sidebar;
