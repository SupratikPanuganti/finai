"use client";
export const dynamic = "force-dynamic";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CompanyContent() {
  const searchParams = useSearchParams();
  const companyName = searchParams.get("name");
  const [company, setCompany] = useState(null);
  const [reportType, setReportType] = useState("Concall");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (companyName) {
      const API = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${API}/companies?name=${encodeURIComponent(companyName)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Company not found:", data.error);
            setCompany(null);
          } else if (Array.isArray(data) && data.length > 0) {
            setCompany(data[0]);
          } else {
            setCompany(null);
          }
        })
        .catch((error) => console.error("Error fetching company:", error));
    }
  }, [companyName]);

  if (!company) {
    return <p className="text-red-500 text-center mt-10">Company not found.</p>;
  }

  const handleGenerateReport = () => {
    if (selectedQuestions.length === 0) {
      alert("Please select at least one question.");
      return;
    }

    const newMessage = {
      type: "bot",
      text: `Generating ${reportType} report for ${company.name}...\n\nSelected Topics: ${selectedQuestions.join(
        ", "
      )}`,
    };

    setChatMessages([...chatMessages, newMessage]);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const userMsg = { type: "user", text: userMessage };
    const botResponse = { type: "bot", text: "Processing request..." };

    setChatMessages([...chatMessages, userMsg, botResponse]);
    setUserMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-28 overflow-y-auto min-h-screen">
      {/* Company Header */}
      <div className="bg-teal-700 text-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold">{company.name}</h1>
        <p className="text-lg mt-2">
          ISIN: <span className="font-semibold">{company.isin}</span>
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-around mt-6 bg-gray-100 p-3 rounded-lg shadow-md">
        <a href="#data" className="text-teal-700 font-semibold hover:underline">
          📊 Data
        </a>
        <a href="#api" className="text-teal-700 font-semibold hover:underline">
          🔗 API Calls
        </a>
        <a href="#reports" className="text-teal-700 font-semibold hover:underline">
          📄 Generate Reports
        </a>
        <a href="#chatbot" className="text-teal-700 font-semibold hover:underline">
          💬 Finbot
        </a>
        <a href="#social" className="text-teal-700 font-semibold hover:underline">
          📢 Announcements
        </a>
      </div>

      {/* Sections */}
      <div className="mt-10 space-y-10">
        {/* Data Section */}
        <section id="data" className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-700">📊 Data</h2>
          <p className="text-gray-600 mt-2">
            Key financial metrics and performance indicators will be displayed here.
          </p>
        </section>

        {/* API Calls Section */}
        <section id="api" className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-700">🔗 API Calls</h2>
          <p className="text-gray-600 mt-2">
            API endpoints for retrieving company data and integrating with external services.
          </p>
        </section>

        {/* Generate Reports Section */}
        <section id="reports" className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-700">📄 Generate Reports</h2>

          {/* Report Type Dropdown */}
          <div className="mt-3">
            <label className="text-gray-700 font-semibold">
              Select Report Type:
            </label>
            <select
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-teal-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="Concall">Concall Report</option>
              <option value="Annual">Annual Report</option>
            </select>
          </div>

          {/* Checkbox Options */}
          <div className="mt-4">
            <label className="text-gray-700 font-semibold">Select Questions:</label>
            <div className="flex flex-col mt-2 space-y-2">
              {[
                "Market Trends",
                "Financial Analysis",
                "Future Plans",
                "Risk Factors",
              ].map((question, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={question}
                    checked={selectedQuestions.includes(question)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuestions([...selectedQuestions, question]);
                      } else {
                        setSelectedQuestions(
                          selectedQuestions.filter((q) => q !== question)
                        );
                      }
                    }}
                  />
                  <span>{question}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Report Button */}
          <button
            onClick={handleGenerateReport}
            className="mt-4 bg-teal-700 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-teal-800 transition"
          >
            Generate Report
          </button>
        </section>

        {/* Chatbot Section */}
        <section id="chatbot" className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-700">
            💬 FinAI - Financial Analysis Chatbot
          </h2>

          <div className="mt-4 border p-4 rounded-md h-80 overflow-y-auto bg-gray-100 flex">
            {/* Chat Sessions Sidebar */}
            <aside className="w-1/4 bg-gray-50 p-4 rounded-lg shadow-md overflow-y-auto">
              <h3 className="text-lg font-semibold text-teal-700">
                📂 Chat Sessions
              </h3>
              <ul className="mt-2 space-y-2">
                <li className="p-2 bg-teal-100 rounded-md cursor-pointer hover:bg-teal-200">
                  Session 1
                </li>
                <li className="p-2 bg-teal-100 rounded-md cursor-pointer hover:bg-teal-200">
                  Session 2
                </li>
                <li className="p-2 bg-teal-100 rounded-md cursor-pointer hover:bg-teal-200">
                  New Session +
                </li>
              </ul>
            </aside>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col ml-4">
              <div className="border p-4 rounded-md h-56 overflow-y-auto bg-gray-100">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 my-1 rounded-md max-w-xs ${
                      msg.type === "bot"
                        ? "bg-teal-200 text-teal-900 self-start text-left"
                        : "bg-gray-300 text-gray-900 self-end text-right ml-auto"
                    }`}
                  >
                    <strong>
                      {msg.type === "bot" ? "FinBot: " : "User: "}
                    </strong>
                    {msg.text}
                  </div>
                ))}
              </div>
              {/* Input Field */}
              <div className="mt-4 flex">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
                  placeholder="Type a message..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-teal-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-800 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section id="social" className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-700">
            📢 Announcements & Social Media
          </h2>
          <p className="text-gray-600 mt-2">
            Financial news, press releases, and social media updates will be
            displayed here.
          </p>
        </section>
      </div>
    </div>
  );
}

export default function CompanyPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading company…</div>}>
      <CompanyContent />
    </Suspense>
  );
}
