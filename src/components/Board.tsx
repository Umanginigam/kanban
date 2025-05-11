import React, { useState } from "react";
import { useKanbanStore, ColumnType, Task } from "../store/kanbanStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion"; 
import TaskModal from "./TaskModal";

const columnTitles: Record<ColumnType, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Board: React.FC = () => {
  const { projects, selectedProjectId, addTask, moveTask } = useKanbanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<ColumnType>("todo");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const project = projects.find((p) => p.id === selectedProjectId);

  if (!project) {
    return <div className="p-4 text-gray-500">Select Project.</div>;
  }

  const groupedTasks: Record<ColumnType, Task[]> = {
    todo: [],
    inprogress: [],
    done: [],
  };

  for (const task of project.tasks) {
    groupedTasks[task.column].push(task);
  }

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const taskId = draggableId;
    const sourceColumn = source.droppableId as ColumnType;
    const destinationColumn = destination.droppableId as ColumnType;

    if (sourceColumn !== destinationColumn) {
      moveTask(taskId, destinationColumn);
    }
  };

  const handleAddTask = (column: ColumnType) => {
    setActiveColumn(column);
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {project.name}
      </h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["todo", "inprogress", "done"] as ColumnType[]).map((col) => (
            <Droppable key={col} droppableId={col}>
              {(provided: any) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-white">
                    {columnTitles[col]}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {groupedTasks[col].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided: any) => (
                          <motion.div
                            layout
                            initial={{ opacity: 0.8, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                          >
                            <h4 className="font-semibold text-gray-800 dark:text-white">
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {task.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-2">
                              Created:{" "}
                              {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    <button
                      className="w-full mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-gray-700 rounded px-2 py-1 transition-all"
                      onClick={() => handleAddTask(col)}
                    >
                      + Add Task
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          column={activeColumn}
          taskToEdit={taskToEdit}
          addTask={addTask}
        />
      )}
    </div>
  );
};

export default Board;
