"use client";

export default function Filter({ setSearch, setStatus }: any) {
  return (
    <div className="flex gap-2 p-4">
      <input
        placeholder="Search..."
        className="border p-2 flex-1"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
