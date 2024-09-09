"use client";
import { useState } from "react";
import { signUp } from "../../utils/auth";
import { motion } from "framer-motion";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUpWithProvider = async (provider) => {
    try {
      await signInWithProvider(provider);
      window.location.href = "/login"; // Redirect on successful sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      window.location.href = "/login"; // Redirect on successful sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={() => handleSignUpWithProvider("google")}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
          >
            Sign up with Google
          </button>
          <button
            onClick={() => handleSignUpWithProvider("github")}
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
          >
            Sign up with GitHub
          </button>
        </div>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </motion.div>
    </div>
  );
}
