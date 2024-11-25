"use client";
import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

const EmailSignup = ({ headerText, subText }) => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
        const response = await axios.post('/api/email/addEmail', {
            email
        });

        if (response.status === 200) {
            setEmail("");
            router.push('/thank-you');
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error("There was an error saving users email: ", error);
        alert("An error occured, please try again later");
    }
    setEmail(""); // Clear the input
  };

  // Competition is the greatest motivator
  // How Does the Pain Games Work?


  return (
    <div className="text-white flex flex-col items-center justify-center mx-2">
      {/* Signup Box */}
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg border border-red-600">
        <p className="text-gray-300 text-center text-xl">
            {headerText}
        </p>
        <p className="text-gray-400 text-center mb-4 text-md">
          {subText}
        </p>

        {/* Email Input */}
        <div className="flex items-center space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-l-md bg-black border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-red-600"
          />
          <button
            onClick={handleSignup}
            className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-r-md text-white font-bold transition-colors"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;
