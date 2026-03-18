"use client";

import { CheckCircle, Trash2 } from "lucide-react";
import { updateTask, deleteTask } from "@/lib/api";

export default function TaskCard({ task, refresh }: any) {
  const handleComplete = async () => {
    await updateTask(task._id, {
      title: task.title,
      description: task.description,
      status: "completed",
    });

    refresh();
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    refresh();
  };

  return (
    <div className="border p-3 rounded mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <span
          className={`text-xs ${
            task.status === "completed" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex gap-3">
        <button onClick={handleComplete} title="Mark Completed">
          <CheckCircle className="text-green-500" size={20} />
        </button>

        <button onClick={handleDelete} title="Delete Task">
          <Trash2 className="text-red-500" size={20} />
        </button>
      </div>
    </div>
  );
}
