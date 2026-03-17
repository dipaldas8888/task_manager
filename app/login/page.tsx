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
    <div className="flex h-screen items-center justify-center">
      <div className="border p-6 rounded w-80">
        <h2 className="mb-4 text-lg">Login</h2>
        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
