import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // ✅ make async
  const cookieStore = await cookies(); // ✅ await here
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Task Manager App</h1>

        <p className="mb-6 text-gray-600">Manage your tasks efficiently 🚀</p>

        <div className="flex gap-4 justify-center">
          <a href="/login" className="bg-black text-white px-4 py-2 rounded">
            Login
          </a>

          <a href="/register" className="border px-4 py-2 rounded">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
