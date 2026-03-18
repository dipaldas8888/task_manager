"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-80 rounded-lg shadow-lg p-6 bg-white">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-medium text-slate-700">Register</h2>
          <p className="text-slate-500">Create your account.</p>
        </div>

        <div className="w-full mt-4 space-y-3">
          <input
            placeholder="Email"
            type="email"
            className="outline-none border-2 rounded-md px-3 py-2 text-slate-600 w-full focus:border-blue-400 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="outline-none border-2 rounded-md px-3 py-2 text-slate-600 w-full focus:border-blue-400 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleRegister}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white transition"
          >
            Register
          </button>

          <p className="flex justify-center space-x-1 text-sm">
            <span className="text-slate-700">Already have an account?</span>
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
