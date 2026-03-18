"use client";

import { useEffect, useState } from "react";
import Filters from "@/components/Filter";
import TaskCard from "@/components/TaskCard";
import { fetchTasks, createTask } from "@/lib/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTasks = async () => {
    const query = `?page=${page}&limit=5&search=${search}&status=${status}`;
    const res = await fetchTasks(query);

    setTasks(res.tasks || []);
    setTotalPages(res.totalPages || 1);
  };

  useEffect(() => {
    loadTasks();
  }, [page, search, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAdd = async () => {
    if (!title) return;

    await createTask({
      title,
      description: "desc",
      status: "pending",
    });

    setTitle("");
    loadTasks();
  };

  return (
    <>
      <Filters setSearch={setSearch} setStatus={setStatus} />

      <div className="flex gap-2 mb-4">
        <input
          value={title}
          className="border p-2 flex-1"
          placeholder="New Task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} refresh={loadTasks} />
        ))
      )}

      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
