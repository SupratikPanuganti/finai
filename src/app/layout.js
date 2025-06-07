"use client";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user session exists in localStorage
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("userSession"); // Remove user session
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed top-0 w-full bg-teal-700 text-white flex items-center justify-between h-24 px-6 shadow-md z-50">
      {/* Logo - Perfectly Centered & Bigger */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src="/logo.png" className="h-20" alt="Logo" />
      </div>

      {/* Login/Signup OR Logout - Right Aligned */}
      <div className="ml-auto flex space-x-4">
        {!isLoggedIn ? (
          <>
            <Link href="/login">
              <button className="bg-white text-teal-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-600 transition">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-teal-700 text-white flex justify-center items-center h-24 shadow-md z-50">
      <div className="flex justify-around w-1/3">
        <Link href="/" passHref>
          <i className="bi bi-house-door text-3xl cursor-pointer hover:opacity-80"></i>
        </Link>
        <Link href="/profile" passHref>
          <i className="bi bi-person-circle text-3xl cursor-pointer hover:opacity-80"></i>
        </Link>
        <Link href="/contact" passHref>
          <i className="bi bi-envelope text-3xl cursor-pointer hover:opacity-80"></i>
        </Link>
      </div>
    </footer>
  );
}
