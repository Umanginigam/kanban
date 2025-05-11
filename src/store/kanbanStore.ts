import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColumnType = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  dueDate?: string; // <-- Add this
  column: ColumnType;
}


export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

interface KanbanState {
  projects: Project[];
  selectedProjectId: string | null;

  // Project actions
  addProject: (name: string) => void;
  renameProject: (id: string, newName: string) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string) => void;

  // Task actions
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newColumn: ColumnType) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      projects: [],
      selectedProjectId: null,

      addProject: (name) => {
        const id = crypto.randomUUID();
        const newProject: Project = { id, name, tasks: [] };
        set((state) => ({
          projects: [...state.projects, newProject],
          selectedProjectId: id,
        }));
      },

      renameProject: (id, newName) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, name: newName } : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => {
          const filtered = state.projects.filter((p) => p.id !== id);
          const selectedProjectId =
            state.selectedProjectId === id ? null : state.selectedProjectId;
          return { projects: filtered, selectedProjectId };
        });
      },

      selectProject: (id) => set(() => ({ selectedProjectId: id })),

      addTask: (task) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === state.selectedProjectId
              ? { ...p, tasks: [...p.tasks, task] }
              : p
          ),
        }));
      },

      updateTask: (task) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === state.selectedProjectId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) => (t.id === task.id ? task : t)),
                }
              : p
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === state.selectedProjectId
              ? {
                  ...p,
                  tasks: p.tasks.filter((t) => t.id !== taskId),
                }
              : p
          ),
        }));
      },

      moveTask: (taskId, newColumn) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === state.selectedProjectId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) =>
                    t.id === taskId ? { ...t, column: newColumn } : t
                  ),
                }
              : p
          ),
        }));
      },
      
      
    }),
    {
      name: "kanban-storage", // Key in localStorage
    }
  )
);
