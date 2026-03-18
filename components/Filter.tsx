"use client";

import { Search } from "lucide-react";

export default function Filter({ setSearch, setStatus }: any) {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-2">
      <div className="relative md:col-span-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

        <input
          placeholder="Search..."
          className="border p-2 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded-md w-full"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
