"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${API}/companies?name=${encodeURIComponent(inputValue)}`
        );
        const data = await response.json();
        console.log("Fetched companies:", data);

        // Set companies to data if it's an array, otherwise set to empty array
        setCompanies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]); // Set to empty array on error
      }
    };

    // Adding debounce to minimize too many requests during typing
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-gray-900 flex items-center">
        Fin<span className="text-green-500">AI</span>
      </h1>
      <p className="text-gray-600 text-lg mt-2">Smart insights, better investments.</p>

      <div className="relative w-full max-w-md mt-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for a company"
          className="w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow"
        />
      </div>

      <div className="mt-3 bg-white p-4 rounded-lg shadow-md w-full max-w-lg flex flex-wrap justify-center gap-3">
        {companies?.slice(0, 9).map((company, index) => (
          <Link key={index} href={`/company?name=${encodeURIComponent(company.name)}`}>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition">
              {company.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
