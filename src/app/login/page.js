"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password123") {
      localStorage.setItem("userSession", JSON.stringify({ email }));
      router.push("/"); // Redirect to home after login
    } else {
      alert("Invalid credentials. Try test@example.com / password123");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Login</h1>
      <form onSubmit={handleLogin} className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="block text-gray-700 text-sm font-semibold">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="block text-gray-700 text-sm font-semibold mt-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </label>

        <button type="submit" className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition">
          Login
        </button>
      </form>

      {/* 👇 Switcher for Signup Page */}
      <p className="text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link href="/signup" className="text-green-600 font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
