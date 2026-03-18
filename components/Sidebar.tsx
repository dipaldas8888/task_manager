import { LayoutDashboard, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-600 text-white p-8">
      <h2 className="text-xl font-bold mb-6">TaskApp</h2>
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center gap-2">
          <LayoutDashboard size={18} /> Dashboard
        </div>
        <div className="flex items-center gap-2 text-red-400 cursor-pointer">
          <LogOut size={18} /> Logout
        </div>
      </div>
    </div>
  );
}
