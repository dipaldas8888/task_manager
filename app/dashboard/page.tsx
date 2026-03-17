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

  const loadTasks = async () => {
    const query = `?search=${search}&status=${status}`;
    const res = await fetchTasks(query);
    setTasks(res.tasks || []);
  };

  useEffect(() => {
    loadTasks();
  }, [search, status]);

  const handleAdd = async () => {
    await createTask({
      title,
      description: "desc",
      status: "pending",
    });
    loadTasks();
  };

  return (
    <>
      <Filters setSearch={setSearch} setStatus={setStatus} />

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="New Task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-black text-white px-4">
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </>
  );
}
