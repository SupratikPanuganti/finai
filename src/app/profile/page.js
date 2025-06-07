"use client";
import { useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "@johndoe",
    bio: "Passionate about technology and innovation. Always learning and building cool stuff.",
    email: "johndoe@example.com",
    location: "San Francisco, CA",
    profilePic: "/profilepicture.png",
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      {/* Profile Picture */}
      <div className="relative">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg"
        />
      </div>

      {/* User Info */}
      <h1 className="text-3xl font-bold text-gray-900 mt-4">{user.name}</h1>
      <p className="text-gray-600 text-lg">{user.username}</p>
      <p className="text-gray-500 text-sm mt-1">{user.location}</p>

      {/* Bio Section */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-gray-700">{user.bio}</p>
      </div>

      {/* Email */}
      <p className="text-gray-500 text-sm mt-2">📧 {user.email}</p>

      {/* Edit Profile Button */}
      <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition">
        Edit Profile
      </button>
    </div>
  );
}