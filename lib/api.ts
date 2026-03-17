export async function fetchTasks(query = "") {
  const res = await fetch(`/api/tasks${query}`, { credentials: "include" });
  return res.json();
}

export async function createTask(data: any) {
  await fetch("/api/tasks", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });
}
