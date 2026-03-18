import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4">
      <div className="backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Task Manager 🚀
        </h1>

        <p className="text-gray-600 mb-6">
          Organize, track, and complete your tasks efficiently with a modern UI.
        </p>

        <div className="flex justify-center gap-2 flex-wrap mb-6">
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            Productivity
          </span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
            Secure Auth
          </span>
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
            Fast UI
          </span>
        </div>

        <div className="flex gap-3 justify-center">
          <a
            href="/login"
            className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Register
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Built with Next.js, Tailwind
        </p>
      </div>
    </div>
  );
}
