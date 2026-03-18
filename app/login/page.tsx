"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async () => {
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
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
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white transition"
          >
            Login
          </button>

          <p className="flex justify-center space-x-1 text-sm">
            <span className="text-slate-700">Don't have an account?</span>
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
