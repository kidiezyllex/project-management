import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { Task as TaskType } from "@/lib/types";
import { EllipsisVertical, Plus } from "lucide-react";
import { Task } from "../Task/page";
import { useUpdateTaskStatusMutation } from "@/state/api";

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  setIsModalNewTaskOpen,
}) => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const ref = useRef<HTMLDivElement>(null);

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  const [{ isOver }, drop] = useDrop<{ id: number }, void, { isOver: boolean }>(
    {
      accept: "task",
      drop: (item) => moveTask(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    },
  );

  drop(ref);

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: Record<string, string> = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={ref}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className="w-2 rounded-s-lg"
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="dark:bg-dark-secondary flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className="dark:bg-dark-tertiary ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="dark:bg-dark-tertiary flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};
