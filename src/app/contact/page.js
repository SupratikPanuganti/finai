"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
      <p className="text-gray-600 mt-2">We'd love to hear from you!</p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <label className="block text-gray-700 text-sm font-semibold">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="block text-gray-700 text-sm font-semibold mt-4">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="block text-gray-700 text-sm font-semibold mt-4">
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          ></textarea>
        </label>

        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-6 text-center">
        <p className="text-gray-700 font-semibold">📧 Email: contact@finai.com</p>
        <p className="text-gray-700 font-semibold mt-1">📞 Phone: +1 (123) 456-7890</p>
      </div>

      {/* Social Links */}
      <div className="mt-4 flex space-x-4">
        <a href="https://twitter.com" target="_blank" className="text-blue-500 text-2xl hover:opacity-80">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="https://facebook.com" target="_blank" className="text-blue-700 text-2xl hover:opacity-80">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" className="text-blue-600 text-2xl hover:opacity-80">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </div>
  );
}
