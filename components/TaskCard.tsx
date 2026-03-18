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
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>

          <span
            className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ${
              task.status === "completed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {task.status}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleComplete}
            title="Mark Completed"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition"
          >
            <CheckCircle size={16} />
            Complete
          </button>

          <button
            onClick={handleDelete}
            title="Delete Task"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
