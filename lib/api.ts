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
export async function updateTask(id: string, data: any) {
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id: string) {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}
