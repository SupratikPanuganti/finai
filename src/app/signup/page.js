"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("userSession", JSON.stringify({ email }));
    router.push("/"); // Redirect to home after signup
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
      <form onSubmit={handleSignup} className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
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

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition">
          Sign Up
        </button>
      </form>

      {/* 👇 Switcher for Login Page */}
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
