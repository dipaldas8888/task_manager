"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        showToast("Invalid email or password", "error");
        return;
      }

      showToast("Login successful", "success");
      setTimeout(() => router.push("/dashboard"), 500);
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {toast && (
        <div
          className={`fixed top-4 right-4 rounded-md px-4 py-2 text-white shadow-md ${
            toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-80 rounded-lg shadow-lg p-6 bg-white">
        {/* Heading */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-medium text-slate-700">Login</h2>
          <p className="text-slate-500">Enter details below.</p>
        </div>

        <div className="w-full mt-4 space-y-3">
          <input
            placeholder="Email"
            type="email"
            className="outline-none border-2 rounded-md px-3 py-2 text-slate-600 w-full focus:border-blue-400 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Password"
            type="password"
            className="outline-none border-2 rounded-md px-3 py-2 text-slate-600 w-full focus:border-blue-400 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white transition disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="flex justify-center space-x-1 text-sm">
            <span className="text-slate-700">Don&apos;t have an account?</span>
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
