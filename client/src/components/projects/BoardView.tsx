import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGetTasksQuery } from "@/state/api";
import { TaskColumn } from "./TaskColumn/page";

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const BoardView: React.FC<BoardProps> = ({
  id,
  setIsModalNewTaskOpen,
}) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};
