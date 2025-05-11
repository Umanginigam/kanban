import React, { useState, useEffect } from "react";
import { useKanbanStore, ColumnType, Task } from "../store/kanbanStore";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: ColumnType;
  taskToEdit: Task | null;
  addTask: (task: Task) => void; 
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  column,
  taskToEdit,
}) => {
  const { addTask,updateTask} = useKanbanStore();

  // State for form fields
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");


  // Initialize form fields if editing an existing task
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit]);

  const handleSave = () => {
    if (!title.trim()) return; // Title is required

    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now().toString(), // Unique ID for new tasks
      title,
      description,
      column,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),

    };

    if (taskToEdit) {
      // If editing, update the task
      updateTask(newTask);
    } else {
      // If creating, add new task
      addTask(newTask);
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {taskToEdit ? "Edit Task" : "Add Task"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Task description"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleSave}
            >
              {taskToEdit ? "Save Changes" : "Add Task"}
            </button>
            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-2 block w-full rounded border-gray-300 dark:bg-gray-800 dark:text-white"/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
